import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const RQuery = () => {
  const queryClient = useQueryClient();
  return <div>React Query Page</div>;
};

export default RQuery;
