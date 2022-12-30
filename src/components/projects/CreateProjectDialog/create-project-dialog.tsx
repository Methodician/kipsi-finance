import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";

const CreateProjectDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div>Dialog</div>
    </Dialog>
  );
};
