
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, ShieldCheck, ShieldX } from "lucide-react";
import { PrivacyMark } from "@/services/privacyService";

interface PrivacyIndicatorProps {
  privacyMark: PrivacyMark;
  showDetails?: boolean;
}

const PrivacyIndicator = ({ privacyMark, showDetails = true }: PrivacyIndicatorProps) => {
  const getPrivacyIcon = (type: string, level: string) => {
    switch (type) {
      case 'protected_registration':
        return <ShieldCheck className="w-3 h-3" />;
      case 'confidentiality_marking':
        return <Shield className="w-3 h-3" />;
      case 'witness_protection':
        return <ShieldX className="w-3 h-3" />;
      default:
        return <Shield className="w-3 h-3" />;
    }
  };

  const getPrivacyColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'medium':
        return 'bg-orange-500 text-white hover:bg-orange-600';
      case 'low':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'protected_registration':
        return 'Protected Registration';
      case 'confidentiality_marking':
        return 'Confidential';
      case 'witness_protection':
        return 'Witness Protection';
      default:
        return 'Protected';
    }
  };

  if (!showDetails) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className={`${getPrivacyColor(privacyMark.level)} cursor-help`}>
              {getPrivacyIcon(privacyMark.type, privacyMark.level)}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs">
              <div className="font-medium">{getTypeLabel(privacyMark.type)}</div>
              <div>Level: {privacyMark.level.toUpperCase()}</div>
              <div>Applied: {privacyMark.appliedDate}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${getPrivacyColor(privacyMark.level)} cursor-help flex items-center gap-1`}>
            {getPrivacyIcon(privacyMark.type, privacyMark.level)}
            <span className="text-xs">{getTypeLabel(privacyMark.type)}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs space-y-1">
            <div className="font-medium">{getTypeLabel(privacyMark.type)}</div>
            <div>Protection Level: {privacyMark.level.toUpperCase()}</div>
            <div>Reason: {privacyMark.reason}</div>
            <div>Applied: {privacyMark.appliedDate}</div>
            <div>Authorized by: {privacyMark.authorizedBy}</div>
            {privacyMark.expiryDate && (
              <div>Expires: {privacyMark.expiryDate}</div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PrivacyIndicator;
