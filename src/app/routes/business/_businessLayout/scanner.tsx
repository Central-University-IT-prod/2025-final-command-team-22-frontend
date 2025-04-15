import { QrScanner } from "@/entities/qrScanner/ui/qrScanner"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/business/_businessLayout/scanner")({
    component: QrPage,
  });
  
function QrPage(){
  return(
    <div className="h-full w-full flex justify-center mt-16">
      <QrScanner />
    </div>
  )
}