import ThemeToggle from "../element/ThemeToggle";
import { Button } from "../ui/button";

function Header() {
  return (
    <>
      <nav className="w-full flex items-center justify-between">
        <span className="font-bold text-2xl text-highlight tracking-widest">
          MuGym
        </span>

        <div className="flex flex-row items-center justify-end gap-4">
          <span>
            <ThemeToggle />
          </span>

          <Button size="sm">Login</Button>
        </div>
      </nav>
    </>
  );
}

export default Header;
