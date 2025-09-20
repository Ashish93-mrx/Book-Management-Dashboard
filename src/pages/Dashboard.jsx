import { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Stack,
  Pagination as MuiPagination,
} from "@mui/material";
import Filters from "../components/Filters";
import BookTable from "../components/BookTable";
import BookFormModal from "../components/BookFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
  usePaginatedBooks,
} from "../hooks/useBook";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, book: null });

  const rowsPerPage = 10;

  const { data: books, total, isLoading, error } = usePaginatedBooks({
    page,
    limit: rowsPerPage,
    q,
    genre,
    status,
  });

  const pageCount = Math.ceil(total / rowsPerPage);

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();

  const openAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    try {
      if (editData?._id) {
        await updateBook.mutateAsync({ id: editData._id, payload });
        toast.success("Book updated");
      } else {
        await createBook.mutateAsync(payload);
        toast.success("Book added");
      }
      setPage(1); // go back to page 1 after add/update
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleEdit = (book) => {
    setEditData(book);
    setModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteBook.mutateAsync(confirm.book._id);
      toast.success("Book deleted");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setConfirm({ open: false, book: null });
    }
  };

  return (
    <Box>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Dashboard</Typography>
        <Button variant="contained" onClick={openAdd}>
          Add Book
        </Button>
      </Stack>

      <Box sx={{ my: 2 }}>

      <Filters
        q={q}
        setQ={setQ}
        genre={genre}
        setGenre={setGenre}
        status={status}
        setStatus={setStatus}
      />
      </Box>

      {/* Table */}
      <BookTable
        books={books}
        loading={isLoading}
        onEdit={handleEdit}
        error={error}
        onDelete={(b) => setConfirm({ open: true, book: b })}
      />

      {/* Pagination */}
      <Stack direction="row" justifyContent="center" mt={2}>
        <MuiPagination
          count={pageCount}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </Stack>

      {/* Add/Edit Modal */}
      <BookFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editData}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirm.open}
        title="Delete Book"
        content={`Delete "${confirm.book?.title}"? This action cannot be undone.`}
        onClose={() => setConfirm({ open: false, book: null })}
        onConfirm={handleDeleteConfirmed}
      />
    </Box>
  );
}
