import {
  FileText,
  Award,
  Briefcase,
  Printer,
  Star,
  Users,
  CheckCircle,
  Zap,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import ServiceCard from "../components/ServiceCard";

const SERVICES = [
  {
    icon: <FileText size={24} />,
    title: "CV Creation",
    description:
      "Get a professional, ATS-friendly CV in minutes. Our expert team crafts standout resumes that get you noticed.",
    tag: "Most Popular",
    color: "#007BFF",
    page: "cv",
  },
  {
    icon: <Award size={24} />,
    title: "Certificate Design",
    description:
      "Experience, Achievement & Custom Certificates. Beautiful, professionally designed certificates for every occasion.",
    tag: "Premium",
    color: "#7C3AED",
    page: "certificate",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Online Job Applies",
    description:
      "We handle the paperwork, you get the interview. Submit your credentials and let us do the heavy lifting.",
    tag: "Time Saver",
    color: "#F59E0B",
    page: "certificate",
  },
  {
    icon: <Printer size={24} />,
    title: "Printing Services",
    description:
      "High-quality Online & Offline printing. Color or B&W, any paper size — delivered to your door or ready for pickup.",
    tag: "Fast & Reliable",
    color: "#28A745",
    page: "printing",
  },
];

const STATS = [
  { value: "2,400+", label: "CVs Delivered", icon: <FileText size={18} /> },
  { value: "98%", label: "Client Satisfaction", icon: <Star size={18} /> },
  { value: "1,800+", label: "Happy Clients", icon: <Users size={18} /> },
  { value: "24hr", label: "Avg. Delivery Time", icon: <Zap size={18} /> },
];

const STEPS = [
  {
    num: "01",
    title: "Choose a Service",
    desc: "Pick from CV creation, certificates, job applications, or printing.",
  },
  {
    num: "02",
    title: "Submit Your Details",
    desc: "Fill in your information through our simple, guided forms.",
  },
  {
    num: "03",
    title: "We Get to Work",
    desc: "Our team processes your request with precision and care.",
  },
  {
    num: "04",
    title: "Download Your Result",
    desc: "Track your order and download the finished file from your dashboard.",
  },
];

const TESTIMONIALS = [
  {
    name: "Fatima K.",
    role: "Software Engineer",
    text: "Got my CV done in under 24 hours. Clean, professional, and it actually got me callbacks. Highly recommend!",
    rating: 5,
  },
  {
    name: "Usman R.",
    role: "Recent Graduate",
    text: "The online job apply service is a lifesaver. They handled 8 applications for me and I landed 3 interviews!",
    rating: 5,
  },
  {
    name: "Sara M.",
    role: "Business Owner",
    text: "Ordered 50 certificates for our company event. Perfect quality, on time, and great communication throughout.",
    rating: 5,
  },
];

export default function Home({ navigate, user }) {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #f0f7ff 0%, #F4F7F6 50%, #f0fff4 100%)",
          position: "relative",
          overflow: "hidden",
          paddingTop: 40,
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(0,123,255,0.05)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(40,167,69,0.05)",
            zIndex: 0,
          }}
        />
        {/* Dot grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(0,123,255,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div
              className="animate-fadeUp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,123,255,0.08)",
                border: "1px solid rgba(0,123,255,0.2)",
                borderRadius: 99,
                padding: "6px 16px",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#28A745",
                  display: "inline-block",
                  animation: "pulse-ring 1.5s ease-out infinite",
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#007BFF" }}>
                Available 24/7 — Fast Delivery
              </span>
            </div>

            <h1
              className="animate-fadeUp anim-delay-1"
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(38px, 5.5vw, 68px)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 24,
                color: "#0d1117",
              }}
            >
              Your Gateway to{" "}
              <span
                style={{
                  color: "#007BFF",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                Professional
                <span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: "linear-gradient(90deg, #007BFF, #28A745)",
                    borderRadius: 99,
                    opacity: 0.35,
                  }}
                />
              </span>{" "}
              Digital Services.
            </h1>

            <p
              className="animate-fadeUp anim-delay-2"
              style={{
                fontSize: 18,
                color: "#6b7280",
                lineHeight: 1.75,
                marginBottom: 36,
                maxWidth: 560,
              }}
            >
              CVs, certificates, job applications, and printing — all handled by
              real professionals. Stop stressing about paperwork and start
              focusing on what matters.
            </p>

            <div
              className="animate-fadeUp anim-delay-3"
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <button
                className="btn btn-primary"
                onClick={() => navigate("cv")}
                style={{ padding: "15px 28px", fontSize: 16 }}
              >
                Build My CV <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("certificate")}
                style={{ padding: "15px 28px", fontSize: 16 }}
              >
                Explore Services
              </button>
            </div>

            {/* Trust line */}
            <div
              className="animate-fadeUp anim-delay-4"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 36,
              }}
            >
              <div style={{ display: "flex" }}>
                {["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: c,
                      border: "2px solid white",
                      marginLeft: i > 0 ? -10 : 0,
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                Trusted by{" "}
                <strong style={{ color: "#0d1117" }}>1,800+ clients</strong>{" "}
                across Pakistan
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section style={{ background: "#007BFF", padding: "48px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 32,
            }}
          >
            {STATS.map((stat, i) => (
              <div key={i} style={{ textAlign: "center", color: "white" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 8,
                    opacity: 0.8,
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: 36,
                    fontWeight: 800,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div
              style={{
                display: "inline-block",
                padding: "5px 16px",
                background: "rgba(0,123,255,0.08)",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                color: "#007BFF",
                marginBottom: 14,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              What We Offer
            </div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                marginBottom: 14,
              }}
            >
              Everything You Need, In One Place
            </h2>
            <p
              style={{
                color: "#6b7280",
                fontSize: 16,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Professional digital services handled by real experts — fast,
              reliable, and affordable.
            </p>
          </div>

          <div className="grid-4">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} {...s} onClick={() => navigate(s.page)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div
              style={{
                display: "inline-block",
                padding: "5px 16px",
                background: "rgba(40,167,69,0.08)",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                color: "#28A745",
                marginBottom: 14,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Simple Process
            </div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
              }}
            >
              How It Works
            </h2>
          </div>

          <div className="grid-4">
            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "24px 16px",
                  position: "relative",
                }}
              >
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 28,
                      right: -12,
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="step-arrow"
                  >
                    <ChevronRight size={20} color="#d1d5db" />
                  </div>
                )}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #007BFF, #0056b3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 18px",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "white",
                    boxShadow: "0 6px 20px rgba(0,123,255,0.25)",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="section" style={{ background: "#f8faff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(26px, 3.5vw, 38px)",
                fontWeight: 800,
              }}
            >
              What Our Clients Say
            </h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#374151",
                    lineHeight: 1.7,
                    marginBottom: 20,
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `hsl(${i * 80}, 60%, 55%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #007BFF 0%, #0056b3 100%)",
          padding: "80px 0",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "white",
              marginBottom: 18,
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 17,
              marginBottom: 36,
              maxWidth: 440,
              margin: "0 auto 36px",
            }}
          >
            Join 1,800+ clients who trust MMK Digital Solution for their
            professional needs.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("cv")}
              style={{
                background: "white",
                color: "#007BFF",
                border: "none",
                borderRadius: 10,
                padding: "15px 30px",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "DM Sans, sans-serif",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <FileText size={18} /> Start with CV
            </button>
            <button
              onClick={() => navigate("printing")}
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.5)",
                borderRadius: 10,
                padding: "15px 30px",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
            >
              Explore All Services
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) { .step-arrow { display: none !important; } }
      `}</style>
    </div>
  );
}
