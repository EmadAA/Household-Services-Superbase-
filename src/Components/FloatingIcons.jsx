
export default function FloatingIcons() {
  return (
    <div>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute text-white/10 text-4xl animate-float"
            style={{ top: "20%", left: "80%", animationDelay: "0s" }}
          >
            🧽
          </div>
          <div
            className="absolute text-white/10 text-4xl animate-float"
            style={{ top: "60%", left: "10%", animationDelay: "2s" }}
          >
            💧
          </div>
          <div
            className="absolute text-white/10 text-4xl animate-float"
            style={{ bottom: "30%", right: "15%", animationDelay: "4s" }}
          >
            ⭐
          </div>
        </div>
    </div>
  )
}
