export type User = {
  id?: string;
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  image?: string;
  sms_verified_at?: string;
  email_verified_at?: string;
  address?: string;
};

export type LoginFields = {
  email: string;
  password: string;
};

export type RegistrationFields = {
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
  city_id?: number | null;
  image?: string;
};

export type City = {
  id?: string;
  name?: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  image?: string;
  link?: string;
  author_id?: string;
  author?: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
};
