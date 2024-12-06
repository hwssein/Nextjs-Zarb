import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";
import { Loader } from "lucide-react";

function FormButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button type="submit" className="w-full">
          <Loader />
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          {title}
        </Button>
      )}
    </>
  );
}

export default FormButton;
