
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="mr-2 flex items-center space-x-1"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium">
        {language === 'sv' ? 'EN' : 'SV'}
      </span>
    </Button>
  );
}
