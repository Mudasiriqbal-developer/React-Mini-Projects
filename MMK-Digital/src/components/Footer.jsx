import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

const WHATSAPP_NUMBER = "923139812169"; // Replace with actual number
const PHONE = "+92 313 9318 572";
const EMAIL = "mudasiriqbal3611@gmail.com";

export default function Footer({ navigate }) {
  const services = [
    { label: "CV Builder", page: "cv" },
    { label: "Certificate Design", page: "certificate" },
    { label: "Online Job Apply", page: "certificate" },
    { label: "Printing Services", page: "printing" },
  ];

  return (
    <footer
      style={{
        background: "#0d1117",
        color: "white",
        paddingTop: 64,
        paddingBottom: 32,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            marginBottom: 56,
          }}
        >
          {/* Brand */}
          <div>
            <Logo size={38} showText textColor="white" />
            <p
              style={{
                marginTop: 18,
                fontSize: 14,
                lineHeight: 1.7,
                color: "#9ca3af",
                maxWidth: 260,
              }}
            >
              Your one-stop platform for professional digital services. CV
              creation, certificates, job applications, and printing — all in
              one place.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I need help with your services.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 22,
                padding: "11px 20px",
                background: "#25D366",
                color: "white",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <MessageCircle size={17} fill="white" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 20,
                color: "white",
              }}
            >
              Our Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {services.map((s) => (
                <button
                  key={s.label}
                  onClick={() => navigate(s.page)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#9ca3af",
                    fontSize: 14,
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    transition: "color 0.18s",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#007BFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#9ca3af";
                  }}
                >
                  <ArrowUpRight size={13} /> {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 20,
                color: "white",
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a
                href={`tel:${PHONE}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#9ca3af",
                  fontSize: 14,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#007BFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(0,123,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Phone size={14} color="#007BFF" />
                </div>
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "#9ca3af",
                  fontSize: 14,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#007BFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(0,123,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Mail size={14} color="#007BFF" />
                </div>
                {EMAIL}
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  color: "#9ca3af",
                  fontSize: 14,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(0,123,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={14} color="#007BFF" />
                </div>
                MMK Digital Solution,
                <br />
                Pakistan
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 28,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: "#6b7280", fontSize: 13 }}>
            © {new Date().getFullYear()} MMK Digital Solution. All rights
            reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span
                key={item}
                style={{ color: "#6b7280", fontSize: 13, cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.color = "#007BFF")}
                onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I need help with your services.`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 500,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
          animation: "float 3s ease-in-out infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)";
        }}
      >
        <MessageCircle size={26} color="white" fill="white" />
        {/* Pulse ring */}
        <span
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px solid #25D366",
            animation: "pulse-ring 2s ease-out infinite",
          }}
        />
      </a>
    </footer>
  );
}
