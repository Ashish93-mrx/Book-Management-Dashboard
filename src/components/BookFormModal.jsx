import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";

export default function BookFormModal({
  open,
  onClose,
  initialData,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      year: "",
      status: "Available",
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          title: initialData.title || "",
          author: initialData.author || "",
          genre: initialData.genre || "",
          year: initialData.year || "",
          status: initialData.status || "Available",
        });
      } else {
        reset({
          title: "",
          author: "",
          genre: "",
          year: "",
          status: "Available",
        });
      }
    }
  }, [open, initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initialData ? "Edit Book" : "Add Book"}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              fullWidth
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Author"
              fullWidth
              {...register("author", { required: "Author is required" })}
              error={!!errors.author}
              helperText={errors.author?.message}
            />
            <TextField
              label="Genre"
              select
              fullWidth
              {...register("genre", { required: "Genre is required" })}
              error={!!errors.genre}
              helperText={errors.genre?.message}
              value={watch("genre") || ""}
            >
              <MenuItem value="">Select Genre</MenuItem>
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Non-fiction">Non-fiction</MenuItem>
              <MenuItem value="Sci-fi">Sci-fi</MenuItem>
              <MenuItem value="Biography">Biography</MenuItem>
            </TextField>
            <TextField
              label="Published Year"
              type="number"
              fullWidth
              {...register("year", { required: "Year is required" })}
              error={!!errors.year}
              helperText={errors.year?.message}
            />
            <TextField
              label="Status"
              select
              fullWidth
              {...register("status")}
              value={watch("status") || "Available"}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Issued">Issued</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
