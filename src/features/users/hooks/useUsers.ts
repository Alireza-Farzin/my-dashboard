import { useQuery } from '@tanstack/react-query';

async function fetchUsers() {
  const res = await fetch("https://dummyjson.com/users?limit=20", {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("خطا در دریافت کاربران");
  const data = await res.json();
  return data.users;
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],  
    queryFn: fetchUsers,  
  });
}
