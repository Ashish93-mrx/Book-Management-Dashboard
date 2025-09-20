import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as booksApi from "../api/booksApi";

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: booksApi.getBooks, // fetches ALL books from CrudCrud
    staleTime: 1000 * 60 * 5, // cache 5 mins
    retry: 1, // retry failed once
  });
};

export const usePaginatedBooks = ({ page, limit, q, genre, status }) => {
  const { data: allBooks = [], isLoading, error } = useBooks();

  let filtered = Array.isArray(allBooks) ? [...allBooks] : [];

  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title?.toLowerCase().includes(lower) ||
        b.author?.toLowerCase().includes(lower)
    );
  }

  if (genre) {
    filtered = filtered.filter((b) => b.genre === genre);
  }

  if (status) {
    filtered = filtered.filter((b) => b.status === status);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return { data: paginated, total, isLoading, error };
};

// Create
export const useCreateBook = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: booksApi.createBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
};

// Update
export const useUpdateBook = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => booksApi.updateBook(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
};

// Delete
export const useDeleteBook = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => booksApi.deleteBook(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
  });
};
