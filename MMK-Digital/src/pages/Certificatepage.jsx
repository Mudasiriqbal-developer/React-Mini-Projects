import { useState } from 'react';
import { Award, Briefcase, Upload, CheckCircle2, Link, FileText, Plus, Trash2 } from 'lucide-react';

const CERTIFICATE_TYPES = {
  experience: {
    label: 'Experience Certificate',
    fields: [
      { id: 'employeeName', label: 'Employee Full Name', type: 'text', placeholder: 'Muhammad Ali Hassan' },
      { id: 'designation', label: 'Designation / Job Title', type: 'text', placeholder: 'Senior Software Engineer' },
      { id: 'company', label: 'Company / Organization Name', type: 'text', placeholder: 'Tech Solutions Pvt. Ltd.' },
      { id: 'startDate', label: 'Start Date', type: 'date' },
      { id: 'endDate', label: 'End Date', type: 'date' },
      { id: 'purpose', label: 'Purpose / Note (Optional)', type: 'textarea', placeholder: 'This certificate is issued for visa application purposes...' },
    ]
  },
  achievement: {
    label: 'Achievement Certificate',
    fields: [
      { id: 'recipientName', label: 'Recipient Full Name', type: 'text', placeholder: 'Sara Ahmed' },
      { id: 'achievement', label: 'Achievement Title', type: 'text', placeholder: 'Best Employee of the Year' },
      { id: 'issuedBy', label: 'Issued By / Organization', type: 'text', placeholder: 'MMK Solutions Ltd.' },
      { id: 'issueDate', label: 'Issue Date', type: 'date' },
      { id: 'description', label: 'Achievement Description', type: 'textarea', placeholder: 'This certificate is awarded in recognition of...' },
    ]
  },
  training: {
    label: 'Training / Course Completion',
    fields: [
      { id: 'participantName', label: 'Participant Name', type: 'text', placeholder: 'Usman Raza' },
      { id: 'courseName', label: 'Course / Training Title', type: 'text', placeholder: 'Advanced React Development' },
      { id: 'institute', label: 'Institute / Platform', type: 'text', placeholder: 'MMK Digital Academy' },
      { id: 'duration', label: 'Duration', type: 'text', placeholder: '3 Months (Jan – Mar 2024)' },
      { id: 'completionDate', label: 'Completion Date', type: 'date' },
    ]
  },
  custom: {
    label: 'Custom Certificate',
    fields: [
      { id: 'recipientName', label: 'Recipient Name', type: 'text', placeholder: 'Full name' },
      { id: 'title', label: 'Certificate Title', type: 'text', placeholder: 'e.g., Certificate of Participation' },
      { id: 'issuedBy', label: 'Issued By', type: 'text', placeholder: 'Organization name' },
      { id: 'date', label: 'Issue Date', type: 'date' },
      { id: 'details', label: 'Additional Details / Instructions', type: 'textarea', placeholder: 'Describe any specific requirements, design preferences, or content...' },
    ]
  },
};

export default function CertificatePage({ navigate, user, showToast }) {
  const [activeTab, setActiveTab] = useState('certificate'); // 'certificate' | 'apply'
  const [certType, setCertType] = useState('');
  const [certForm, setCertForm] = useState({});
  const [certSubmitted, setCertSubmitted] = useState(false);
  const [certLoading, setCertLoading] = useState(false);

  // Apply form
  const [applyForm, setApplyForm] = useState({
    fullName: '', email: '', phone: '', coverLetter: '',
  });
  const [jobLinks, setJobLinks] = useState([{ url: '', notes: '' }]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const certConfig = certType ? CERTIFICATE_TYPES[certType] : null;

  const handleCertSubmit = async () => {
    if (!certType) { showToast('Please select a certificate type.', 'error'); return; }
    if (!user) { showToast('Please login to submit your request.', 'error'); return; }
    setCertLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setCertLoading(false);
    setCertSubmitted(true);
    showToast('Certificate request submitted!', 'success');
  };

  const handleFileUpload = (files) => {
    const arr = Array.from(files);
    setUploadedFiles(prev => [...prev, ...arr]);
  };

  const handleApplySubmit = async () => {
    if (!applyForm.fullName || !applyForm.email) { showToast('Please fill required fields.', 'error'); return; }
    if (!user) { showToast('Please login to submit.', 'error'); return; }
    setApplyLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setApplyLoading(false);
    setApplySubmitted(true);
    showToast('Application request submitted!', 'success');
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, marginBottom: 8 }}>
            Certificates & Job Applications
          </h1>
          <p style={{ color: '#6b7280', fontSize: 15 }}>
            Custom certificate design or let us handle your online job applications — you focus on preparing, we handle the paperwork.
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 4, background: '#f3f4f6', borderRadius: 12, padding: 4, marginBottom: 36, width: 'fit-content' }}>
          {[
            { id: 'certificate', label: 'Certificate Design', icon: <Award size={16} /> },
            { id: 'apply', label: 'Online Job Apply', icon: <Briefcase size={16} /> },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 9, border: 'none',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14,
                cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#007BFF' : '#6b7280',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── CERTIFICATE TAB ── */}
        {activeTab === 'certificate' && (
          certSubmitted ? <SuccessCard title="Certificate Request Sent!" desc="We will design your certificate and it will be available in your dashboard within 48 hours." navigate={navigate} /> : (
            <div>
              {/* Type selector */}
              <div className="card" style={{ padding: '28px', marginBottom: 24 }}>
                <label className="form-label" style={{ fontSize: 15, marginBottom: 14 }}>
                  Select Certificate Type
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                  {Object.entries(CERTIFICATE_TYPES).map(([key, val]) => (
                    <button key={key} onClick={() => { setCertType(key); setCertForm({}); }}
                      style={{
                        padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                        border: certType === key ? '2px solid #007BFF' : '2px solid #e5e7eb',
                        background: certType === key ? 'rgba(0,123,255,0.05)' : 'white',
                        textAlign: 'left', transition: 'all 0.2s',
                        fontFamily: 'DM Sans, sans-serif',
                      }}>
                      <Award size={20} color={certType === key ? '#007BFF' : '#9ca3af'} style={{ marginBottom: 8 }} />
                      <div style={{ fontWeight: 600, fontSize: 13, color: certType === key ? '#007BFF' : '#374151' }}>{val.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic fields */}
              {certConfig && (
                <div className="card" style={{ padding: '28px', marginBottom: 24 }}>
                  <h3 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, marginBottom: 20, color: '#0d1117' }}>
                    {certConfig.label} — Details
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    {certConfig.fields.map(field => (
                      <div key={field.id} style={field.type === 'textarea' ? { gridColumn: '1 / -1' } : {}}>
                        <label className="form-label">{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea className="form-input" rows={3} placeholder={field.placeholder}
                            value={certForm[field.id] || ''}
                            onChange={e => setCertForm(f => ({ ...f, [field.id]: e.target.value }))}
                            style={{ resize: 'vertical' }}
                          />
                        ) : (
                          <input className="form-input" type={field.type}
                            placeholder={field.placeholder}
                            value={certForm[field.id] || ''}
                            onChange={e => setCertForm(f => ({ ...f, [field.id]: e.target.value }))}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary" onClick={handleCertSubmit}
                    disabled={certLoading}
                    style={{ marginTop: 24, padding: '13px 28px' }}>
                    {certLoading ? <><span className="loader" /> Submitting...</> : <><CheckCircle2 size={17} /> Submit Request</>}
                  </button>
                </div>
              )}
            </div>
          )
        )}

        {/* ── APPLY TAB ── */}
        {activeTab === 'apply' && (
          applySubmitted ? <SuccessCard title="Application Request Received!" desc="We have received your application request and will process it within 24 hours. Track progress in your dashboard." navigate={navigate} /> : (
            <div>
              {/* Info banner */}
              <div style={{ padding: '18px 20px', background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.2)', borderRadius: 14, marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <Briefcase size={20} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#92400E', marginBottom: 4 }}>How Online Apply Works</div>
                  <p style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6 }}>
                    Upload your credentials (CV, certificates, documents) and paste the job application links. Our team will submit your applications professionally and keep you updated.
                  </p>
                </div>
              </div>

              <div className="card" style={{ padding: '28px', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Your Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" value={applyForm.fullName} onChange={e => setApplyForm(f => ({ ...f, fullName: e.target.value }))} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" value={applyForm.email} onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <input className="form-input" value={applyForm.phone} onChange={e => setApplyForm(f => ({ ...f, phone: e.target.value }))} placeholder="+92 300 000 0000" />
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <label className="form-label">Cover Letter / Additional Notes</label>
                  <textarea className="form-input" rows={4} value={applyForm.coverLetter}
                    onChange={e => setApplyForm(f => ({ ...f, coverLetter: e.target.value }))}
                    placeholder="Any specific instructions, your objective, or notes for our team..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Job links */}
              <div className="card" style={{ padding: '28px', marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <h3 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700 }}>Job Application Links</h3>
                  <button onClick={() => setJobLinks([...jobLinks, { url: '', notes: '' }])} className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }}>
                    <Plus size={14} /> Add Link
                  </button>
                </div>
                {jobLinks.map((job, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <Link size={14} color="#007BFF" />
                        <input className="form-input" value={job.url}
                          onChange={e => setJobLinks(jobs => jobs.map((j, idx) => idx === i ? { ...j, url: e.target.value } : j))}
                          placeholder="https://jobs.example.com/apply/12345" style={{ padding: '10px 14px' }} />
                      </div>
                      <input className="form-input" value={job.notes}
                        onChange={e => setJobLinks(jobs => jobs.map((j, idx) => idx === i ? { ...j, notes: e.target.value } : j))}
                        placeholder="Position title or any notes (optional)" style={{ padding: '10px 14px', fontSize: 13 }} />
                    </div>
                    {jobLinks.length > 1 && (
                      <button onClick={() => setJobLinks(jobs => jobs.filter((_, idx) => idx !== i))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', marginTop: 8 }}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* File upload */}
              <div className="card" style={{ padding: '28px', marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Syne', fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Upload Your Documents</h3>
                <div className={`upload-zone${dragOver ? ' drag-over' : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFileUpload(e.dataTransfer.files); }}
                  onClick={() => document.getElementById('apply-files').click()}
                >
                  <Upload size={32} color="#007BFF" style={{ marginBottom: 12, opacity: 0.7 }} />
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Drop files here or click to browse</p>
                  <p style={{ fontSize: 13, color: '#6b7280' }}>CV, Certificates, CNIC copy, Transcripts — PDF, DOC, JPG up to 10MB each</p>
                  <input id="apply-files" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }}
                    onChange={e => handleFileUpload(e.target.files)}
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {uploadedFiles.map((file, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#f9fafb', borderRadius: 10, border: '1px solid #e5e7eb' }}>
                        <FileText size={16} color="#007BFF" />
                        <span style={{ fontSize: 13, flex: 1 }}>{file.name}</span>
                        <span style={{ fontSize: 12, color: '#6b7280' }}>{(file.size / 1024).toFixed(0)} KB</span>
                        <CheckCircle2 size={15} color="#28A745" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="btn btn-primary" onClick={handleApplySubmit}
                disabled={applyLoading}
                style={{ padding: '14px 32px', fontSize: 15 }}>
                {applyLoading ? <><span className="loader" /> Submitting...</> : <><CheckCircle2 size={17} /> Submit Application Request</>}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function SuccessCard({ title, desc, navigate }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'rgba(40,167,69,0.1)', border: '2px solid #28A745',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px', animation: 'float 3s ease-in-out infinite',
      }}>
        <CheckCircle2 size={32} color="#28A745" />
      </div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 12 }}>{title}</h2>
      <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', fontSize: 15 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => navigate('dashboard')} style={{ padding: '12px 22px' }}>
          View Dashboard
        </button>
        <button className="btn btn-outline" onClick={() => navigate('home')} style={{ padding: '12px 22px' }}>
          Back to Home
        </button>
      </div>
    </div>
  );
}