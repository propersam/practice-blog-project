import BaseService from "@/services/base.service";
import { useEffect, useRef, useReducer } from "react";

interface IState {
  loading: boolean;
  status: "idle" | "fetching" | "fetched" | "error";
  error: any;
  data: any[];
}

export const useApiFetch = (apiService: BaseService, endpoint = "", query = "") => {
  const cacheData = useRef<Record<string, []>>({});

  const initialState: IState = {
    loading: false,
    status: "idle",
    error: null,
    data: [],
  };
  const [state, dispatch] = useReducer((state: any, action: { type?: any; payload?: any }) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching", loading: true };
      case "FETCHED":
        return { ...initialState, status: "fetched", loading: false, data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", loading: false, error: action.payload };
      default:
        return state;
    }
  }, initialState);

  const dataKey = `${apiService.url && apiService.url}${endpoint && "-" + endpoint}${query && "?" + query}`;
  useEffect(() => {
    let cancelRequest = false;
    if (!dataKey) return;

    const renderData = async () => {
      dispatch({ type: "FETCHING" });

      if (cacheData.current[dataKey]) {
        const data = cacheData.current[dataKey];
        console.log("loaded current cache: ", data);
        dispatch({ type: "FETCHED", payload: data });
      } else {
        console.log("api fetch triggered for : ", dataKey.split("-").join());
        try {
          const res = await apiService.fetchData(endpoint, query);
          const data = res.data;
          cacheData.current[dataKey] = data;
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error: any) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error?.response?.request?.data?.message });
        }
      }
    };
    renderData();
    return function cleanup() {
      cancelRequest = true;
    };
  }, [apiService, endpoint, query, dataKey]);
  return state;
};
