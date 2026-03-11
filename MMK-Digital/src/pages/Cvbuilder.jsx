import { useState } from 'react';
import { User, GraduationCap, Briefcase, Star, Camera, CheckCircle2, Plus, Trash2, Upload } from 'lucide-react';

const STEPS = [
  { id: 'personal', label: 'Personal', icon: <User size={15} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={15} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={15} /> },
  { id: 'skills', label: 'Skills', icon: <Star size={15} /> },
  { id: 'photo', label: 'Photo', icon: <Camera size={15} /> },
];

export default function CVBuilder({ navigate, user, showToast }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const [personal, setPersonal] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', linkedin: '', objective: '',
  });

  const [education, setEducation] = useState([
    { degree: '', institution: '', year: '', grade: '' }
  ]);

  const [experience, setExperience] = useState([
    { title: '', company: '', startDate: '', endDate: '', current: false, description: '' }
  ]);

  const [skills, setSkills] = useState({ technical: '', soft: '', languages: '', certifications: '' });

  const addEducation = () => setEducation([...education, { degree: '', institution: '', year: '', grade: '' }]);
  const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));
  const updateEdu = (i, field, val) => setEducation(education.map((e, idx) => idx === i ? { ...e, [field]: val } : e));

  const addExperience = () => setExperience([...experience, { title: '', company: '', startDate: '', endDate: '', current: false, description: '' }]);
  const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));
  const updateExp = (i, field, val) => setExperience(experience.map((e, idx) => idx === i ? { ...e, [field]: val } : e));

  const handlePhotoUpload = (file) => {
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = e => setPhotoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!user) { showToast('Please login to submit your CV.', 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    showToast('CV submitted successfully! We will process it soon.', 'success');
  };

  if (submitted) return <SuccessView navigate={navigate} />;

  const stepContents = [
    // Step 0: Personal
    <div key="personal">
      <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#0d1117' }}>Personal Details</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        <FormField label="Full Name *" placeholder="Muhammad Ali Hassan">
          <input className="form-input" value={personal.fullName} onChange={e => setPersonal(p => ({ ...p, fullName: e.target.value }))} placeholder="Muhammad Ali Hassan" />
        </FormField>
        <FormField label="Email Address *">
          <input className="form-input" type="email" value={personal.email} onChange={e => setPersonal(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" />
        </FormField>
        <FormField label="Phone Number *">
          <input className="form-input" value={personal.phone} onChange={e => setPersonal(p => ({ ...p, phone: e.target.value }))} placeholder="+92 300 000 0000" />
        </FormField>
        <FormField label="City">
          <input className="form-input" value={personal.city} onChange={e => setPersonal(p => ({ ...p, city: e.target.value }))} placeholder="Karachi, Pakistan" />
        </FormField>
        <FormField label="LinkedIn Profile">
          <input className="form-input" value={personal.linkedin} onChange={e => setPersonal(p => ({ ...p, linkedin: e.target.value }))} placeholder="linkedin.com/in/yourname" />
        </FormField>
        <FormField label="Address">
          <input className="form-input" value={personal.address} onChange={e => setPersonal(p => ({ ...p, address: e.target.value }))} placeholder="Street, Area, City" />
        </FormField>
      </div>
      <FormField label="Career Objective / Summary" style={{ marginTop: 16 }}>
        <textarea className="form-input" rows={4}
          value={personal.objective}
          onChange={e => setPersonal(p => ({ ...p, objective: e.target.value }))}
          placeholder="A motivated professional with expertise in..."
          style={{ resize: 'vertical' }}
        />
      </FormField>
    </div>,

    // Step 1: Education
    <div key="education">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, color: '#0d1117' }}>Education History</h3>
        <button onClick={addEducation} className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
          <Plus size={15} /> Add More
        </button>
      </div>
      {education.map((edu, i) => (
        <div key={i} style={{ border: '1.5px solid #e5e7eb', borderRadius: 14, padding: '20px', marginBottom: 16, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#007BFF' }}>Education #{i + 1}</span>
            {education.length > 1 && (
              <button onClick={() => removeEducation(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
                <Trash2 size={14} /> Remove
              </button>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <FormField label="Degree / Qualification">
              <input className="form-input" value={edu.degree} onChange={e => updateEdu(i, 'degree', e.target.value)} placeholder="Bachelor's in Computer Science" />
            </FormField>
            <FormField label="Institution Name">
              <input className="form-input" value={edu.institution} onChange={e => updateEdu(i, 'institution', e.target.value)} placeholder="University of Karachi" />
            </FormField>
            <FormField label="Year of Completion">
              <input className="form-input" type="text" value={edu.year} onChange={e => updateEdu(i, 'year', e.target.value)} placeholder="2024" />
            </FormField>
            <FormField label="Grade / CGPA">
              <input className="form-input" value={edu.grade} onChange={e => updateEdu(i, 'grade', e.target.value)} placeholder="3.5 / 4.0" />
            </FormField>
          </div>
        </div>
      ))}
    </div>,

    // Step 2: Experience
    <div key="experience">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, color: '#0d1117' }}>Work Experience</h3>
        <button onClick={addExperience} className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
          <Plus size={15} /> Add More
        </button>
      </div>
      {experience.map((exp, i) => (
        <div key={i} style={{ border: '1.5px solid #e5e7eb', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#007BFF' }}>Experience #{i + 1}</span>
            {experience.length > 1 && (
              <button onClick={() => removeExperience(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
                <Trash2 size={14} /> Remove
              </button>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <FormField label="Job Title">
              <input className="form-input" value={exp.title} onChange={e => updateExp(i, 'title', e.target.value)} placeholder="Frontend Developer" />
            </FormField>
            <FormField label="Company Name">
              <input className="form-input" value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} placeholder="Tech Solutions Pvt. Ltd." />
            </FormField>
            <FormField label="Start Date">
              <input className="form-input" type="month" value={exp.startDate} onChange={e => updateExp(i, 'startDate', e.target.value)} />
            </FormField>
            {!exp.current && (
              <FormField label="End Date">
                <input className="form-input" type="month" value={exp.endDate} onChange={e => updateExp(i, 'endDate', e.target.value)} />
              </FormField>
            )}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            <input type="checkbox" checked={exp.current} onChange={e => updateExp(i, 'current', e.target.checked)} />
            Currently working here
          </label>
          <FormField label="Job Description / Key Responsibilities" style={{ marginTop: 14 }}>
            <textarea className="form-input" rows={3} value={exp.description}
              onChange={e => updateExp(i, 'description', e.target.value)}
              placeholder="Describe your key responsibilities and achievements..."
              style={{ resize: 'vertical' }}
            />
          </FormField>
        </div>
      ))}
    </div>,

    // Step 3: Skills
    <div key="skills">
      <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#0d1117' }}>Skills & Competencies</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        <FormField label="Technical Skills" hint="Separate with commas">
          <textarea className="form-input" rows={3} value={skills.technical}
            onChange={e => setSkills(s => ({ ...s, technical: e.target.value }))}
            placeholder="React, Next.js, Python, SQL, Figma..."
            style={{ resize: 'none' }}
          />
        </FormField>
        <FormField label="Soft Skills" hint="Separate with commas">
          <textarea className="form-input" rows={3} value={skills.soft}
            onChange={e => setSkills(s => ({ ...s, soft: e.target.value }))}
            placeholder="Leadership, Communication, Problem Solving..."
            style={{ resize: 'none' }}
          />
        </FormField>
        <FormField label="Languages Known">
          <input className="form-input" value={skills.languages} onChange={e => setSkills(s => ({ ...s, languages: e.target.value }))} placeholder="Urdu (Native), English (Fluent)" />
        </FormField>
        <FormField label="Certifications / Courses">
          <input className="form-input" value={skills.certifications} onChange={e => setSkills(s => ({ ...s, certifications: e.target.value }))} placeholder="AWS Cloud Practitioner, Google Analytics..." />
        </FormField>
      </div>
    </div>,

    // Step 4: Photo
    <div key="photo">
      <h3 style={{ fontFamily: 'Syne', fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#0d1117' }}>Upload Your Photo</h3>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>A professional headshot makes your CV stand out. Use a clear, front-facing photo.</p>

      {photoPreview ? (
        <div style={{ textAlign: 'center' }}>
          <img src={photoPreview} alt="Preview" style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', border: '4px solid #007BFF', marginBottom: 20 }} />
          <div>
            <p style={{ color: '#28A745', fontWeight: 600, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <CheckCircle2 size={16} /> Photo uploaded successfully
            </p>
            <button onClick={() => { setPhoto(null); setPhotoPreview(null); }} className="btn btn-outline" style={{ padding: '9px 20px', fontSize: 13 }}>
              Change Photo
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`upload-zone${dragOver ? ' drag-over' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) handlePhotoUpload(file); }}
          onClick={() => document.getElementById('photo-input').click()}
        >
          <Upload size={36} color="#007BFF" style={{ marginBottom: 14, opacity: 0.7 }} />
          <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Drag & drop or click to upload</p>
          <p style={{ fontSize: 13, color: '#6b7280' }}>PNG, JPG up to 5MB. Passport-size recommended.</p>
          <input id="photo-input" type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => { if (e.target.files[0]) handlePhotoUpload(e.target.files[0]); }}
          />
        </div>
      )}

      <div style={{ marginTop: 28, padding: '18px 20px', background: 'rgba(0,123,255,0.05)', borderRadius: 12, border: '1px solid rgba(0,123,255,0.12)' }}>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65 }}>
          <strong style={{ color: '#007BFF' }}>What happens next?</strong><br />
          Once you submit, our team will review your information and craft a professional CV. You can track your order status and download the final PDF from your dashboard within 24 hours.
        </p>
      </div>
    </div>,
  ];

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, marginBottom: 8 }}>
            Build Your Professional CV
          </h1>
          <p style={{ color: '#6b7280', fontSize: 15 }}>
            Fill out the form below — we handle the design and formatting for you.
          </p>
        </div>

        {/* Step bar */}
        <div className="step-bar">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`step-item${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
              <div className="step-circle">
                {i < step ? <CheckCircle2 size={16} /> : s.icon}
              </div>
              <div className="step-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="card" style={{ padding: '36px 32px', marginBottom: 24 }}>
          {stepContents[step]}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-outline"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            style={{ opacity: step === 0 ? 0.4 : 1, padding: '12px 24px' }}
          >
            ← Back
          </button>

          <span style={{ fontSize: 13, color: '#6b7280' }}>Step {step + 1} of {STEPS.length}</span>

          {step < STEPS.length - 1 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)} style={{ padding: '12px 28px' }}>
              Next Step →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}
              style={{ padding: '12px 28px', background: '#28A745', boxShadow: '0 4px 16px rgba(40,167,69,0.3)' }}>
              {loading ? <><span className="loader" /> Submitting...</> : <><CheckCircle2 size={17} /> Submit CV</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, hint, children, style }) {
  return (
    <div style={style}>
      <label className="form-label">{label}</label>
      {hint && <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 6 }}>{hint}</span>}
      {children}
    </div>
  );
}

function SuccessView({ navigate }) {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 560, textAlign: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(40,167,69,0.1)', border: '2px solid #28A745',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', animation: 'float 3s ease-in-out infinite',
        }}>
          <CheckCircle2 size={36} color="#28A745" />
        </div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 30, fontWeight: 800, marginBottom: 14 }}>CV Submitted!</h2>
        <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: 32, fontSize: 16 }}>
          Your CV request has been received. Our team will craft your professional CV and it will be available in your dashboard within 24 hours.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('dashboard')} style={{ padding: '13px 24px' }}>
            View My Dashboard
          </button>
          <button className="btn btn-outline" onClick={() => navigate('home')} style={{ padding: '13px 24px' }}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}