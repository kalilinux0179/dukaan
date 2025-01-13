import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/Common/theme-provider";

const ThemeModes = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {isDarkMode ? (
          <Moon
            className={`h-5 w-5 ${
              isDarkMode ? "text-yellow-500" : "text-blue-700"
            }`}
          />
        ) : (
          <Sun
            className={`h-5 w-5 ${
              isDarkMode ? "text-yellow-500" : "text-blue-700"
            }`}
          />
        )}
        <Switch checked={isDarkMode} onCheckedChange={handleToggle} />

      </div>
    </div>
  );
};

export default ThemeModes;