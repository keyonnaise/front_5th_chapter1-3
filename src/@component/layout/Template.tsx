import { useThemeStateContext } from "../../@context/ThemeProvider";

interface Props {
  children: React.ReactNode;
}

function Template({ children }: Props) {
  const { theme } = useThemeStateContext("Template");

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
      {children}
    </div>
  );
}

export default Template;
