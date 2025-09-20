import { TextField, MenuItem, Stack } from "@mui/material";

export default function Filters({ q, setQ, genre, setGenre, status, setStatus }) {
  return (
    <Stack mb={2} flexWrap="wrap" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ my: { xs: 2, sm: 0 } }}>
      <TextField
        label="Search"
        value={q || ""}
        onChange={(e) => setQ(e.target.value)}
        size="small"
      />

      {/* Genre Filter */}
      <TextField
        select
        label="Genre"
        value={genre || ""} 
        onChange={(e) => setGenre(e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Fiction">Fiction</MenuItem>
        <MenuItem value="Non-fiction">Non-fiction</MenuItem>
        <MenuItem value="Sci-fi">Sci-fi</MenuItem>
        <MenuItem value="Biography">Biography</MenuItem>
      </TextField>

      {/* Status Filter */}
      <TextField
        select
        label="Status"
        value={status || ""} // ensure controlled
        onChange={(e) => setStatus(e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Available">Available</MenuItem>
        <MenuItem value="Issued">Issued</MenuItem>
      </TextField>
    </Stack>
  );
}
