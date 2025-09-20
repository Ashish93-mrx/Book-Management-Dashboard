import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Skeleton,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BookTable({
  books = [],
  loading,
  error,
  onEdit,
  onDelete,
}) {

  const safeBooks = Array.isArray(books) ? books : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Genre</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Year</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <Skeleton variant="rectangular" height={30} />
                </TableCell>
              </TableRow>
            ))}

          {!loading && error && (
            <TableRow>
              <TableCell colSpan={6}>
                <Box textAlign="center" py={2}>
                  <Alert severity="error">
                    Failed to load books: {error.message || "Unknown error"}
                  </Alert>
                </Box>
              </TableCell>
            </TableRow>
          )}

          {!loading && !error && safeBooks.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>
                <Box textAlign="center" py={2}>
                  <Typography variant="body2" color="text.secondary">
                    No books found.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            !error &&
            safeBooks.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>{book.status}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => onEdit(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(book)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}