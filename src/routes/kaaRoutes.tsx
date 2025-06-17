
import { Route } from "react-router-dom";
import KAARegistry from "@/pages/KAARegistry";
import ContactOccasions from "@/pages/kaa/ContactOccasions";

export const kaaRoutes = (
  <>
    <Route path="/kaa/registry" element={<KAARegistry />} />
    <Route path="/kaa/contacts" element={<ContactOccasions />} />
  </>
);
