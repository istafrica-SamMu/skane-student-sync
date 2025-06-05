
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="mr-2 flex items-center space-x-1"
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium">
        {language === 'en' ? 'EN' : 'SV'}
      </span>
    </Button>
  );
}
