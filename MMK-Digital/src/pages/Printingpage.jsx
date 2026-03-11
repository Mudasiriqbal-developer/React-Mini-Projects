import { useState } from 'react';
import { Upload, Printer, Package, Truck, CheckCircle2, FileText, X, Palette } from 'lucide-react';

const PAPER_SIZES = ['A4 (Standard)', 'A3', 'A5', 'Letter (8.5x11)', 'Legal (8.5x14)', 'Custom Size'];
const QUANTITIES = ['1-10 pages', '11-25 pages', '26-50 pages', '51-100 pages', '100+ pages'];

export default function PrintingPage({ navigate, user, showToast }) {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState({
    colorMode: 'color',
    paperSize: 'A4 (Standard)',
    quantity: '1-10 pages',
    delivery: 'pickup',
    sides: 'single',
    copies: 1,
    address: '',
    notes: '',
    binding: 'none',
  });

  const setOpt = (key, val) => setOptions(o => ({ ...o, [key]: val }));

  const handleFileUpload = (fileList) => {
    const arr = Array.from(fileList);
    setFiles(prev => [...prev, ...arr]);
  };

  const removeFile = (i) => setFiles(files.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (files.length === 0) { showToast('Please upload at least one document.', 'error'); return; }
    if (!user) { showToast('Please login to place an order.', 'error'); return; }
    if (options.delivery === 'delivery' && !options.address) {
      showToast('Please enter your delivery address.', 'error'); return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    showToast('Printing order placed!', 'success');
  };

  const estimatedPrice = () => {
    const base = options.colorMode === 'color' ? 15 : 7;
    const copies = Number(options.copies) || 1;
    const deliveryFee = options.delivery === 'delivery' ? 100 : 0;
    return (base * copies) + deliveryFee;
  };

  if (submitted) {
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
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Order Placed!</h2>
          <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: 30, fontSize: 15 }}>
            Your printing order is confirmed. We will process it within 24 hours.{' '}
            {options.delivery === 'delivery' ? 'Your prints will be delivered to the provided address.' : 'Your prints will be ready for self-pickup.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('dashboard')} style={{ padding: '12px 22px' }}>
              Track My Order
            </button>
            <button className="btn btn-outline" onClick={() => navigate('home')} style={{ padding: '12px 22px' }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, marginBottom: 8 }}>
            Printing Services
          </h1>
          <p style={{ color: '#6b7280', fontSize: 15 }}>
            Upload your documents, choose your preferences, and we handle the rest — pickup or home delivery.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 24, alignItems: 'start' }}>

          {/* Left: Main form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Upload */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Upload size={17} color="#007BFF" /> Upload Documents
              </h3>
              <div className={`upload-zone${dragOver ? ' drag-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleFileUpload(e.dataTransfer.files); }}
                onClick={() => document.getElementById('print-files').click()}
              >
                <Printer size={32} color="#007BFF" style={{ marginBottom: 12, opacity: 0.7 }} />
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Drop files here or click to upload</p>
                <p style={{ fontSize: 13, color: '#6b7280' }}>PDF, DOC, DOCX, JPG, PNG — up to 50MB per file</p>
                <input id="print-files" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }}
                  onChange={e => handleFileUpload(e.target.files)}
                />
              </div>

              {files.length > 0 && (
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {files.map((file, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#f9fafb', borderRadius: 10, border: '1px solid #e5e7eb' }}>
                      <FileText size={15} color="#007BFF" />
                      <span style={{ fontSize: 13, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                      <span style={{ fontSize: 12, color: '#9ca3af', flexShrink: 0 }}>{(file.size / 1024).toFixed(0)} KB</span>
                      <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 2 }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Print options */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Palette size={17} color="#007BFF" /> Print Options
              </h3>

              {/* Color mode */}
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">Color Mode</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { id: 'color', label: '🎨 Full Color', desc: 'Rs. 15/page' },
                    { id: 'bw', label: '⚫ Black & White', desc: 'Rs. 7/page' },
                  ].map(mode => (
                    <button key={mode.id} onClick={() => setOpt('colorMode', mode.id)}
                      style={{
                        flex: 1, padding: '14px 12px', borderRadius: 12, cursor: 'pointer',
                        border: options.colorMode === mode.id ? '2px solid #007BFF' : '2px solid #e5e7eb',
                        background: options.colorMode === mode.id ? 'rgba(0,123,255,0.05)' : 'white',
                        textAlign: 'center', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
                      }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: options.colorMode === mode.id ? '#007BFF' : '#374151' }}>{mode.label}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper size */}
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">Paper Size</label>
                <select className="form-select" value={options.paperSize} onChange={e => setOpt('paperSize', e.target.value)}>
                  {PAPER_SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Sides */}
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">Printing Sides</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[{ id: 'single', label: 'Single-Sided' }, { id: 'double', label: 'Double-Sided' }].map(side => (
                    <button key={side.id} onClick={() => setOpt('sides', side.id)}
                      style={{
                        flex: 1, padding: '11px', borderRadius: 10, cursor: 'pointer',
                        border: options.sides === side.id ? '2px solid #007BFF' : '2px solid #e5e7eb',
                        background: options.sides === side.id ? 'rgba(0,123,255,0.05)' : 'white',
                        fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14,
                        color: options.sides === side.id ? '#007BFF' : '#374151',
                        transition: 'all 0.2s',
                      }}>
                      {side.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Binding */}
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">Binding / Finishing</label>
                <select className="form-select" value={options.binding} onChange={e => setOpt('binding', e.target.value)}>
                  <option value="none">No Binding</option>
                  <option value="staple">Staple</option>
                  <option value="spiral">Spiral Binding</option>
                  <option value="tape">Tape Binding</option>
                  <option value="laminate">Lamination</option>
                </select>
              </div>

              {/* Copies */}
              <div>
                <label className="form-label">Number of Copies</label>
                <input className="form-input" type="number" min="1" max="999"
                  value={options.copies}
                  onChange={e => setOpt('copies', e.target.value)}
                  style={{ width: 120 }}
                />
              </div>
            </div>

            {/* Delivery */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Truck size={17} color="#007BFF" /> Delivery Option
              </h3>
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {[
                  { id: 'pickup', label: '🏪 Self-Pickup', desc: 'Free — Ready in 24 hours', icon: <Package size={18} /> },
                  { id: 'delivery', label: '🚚 Home Delivery', desc: 'Rs. 100 delivery fee', icon: <Truck size={18} /> },
                ].map(opt => (
                  <button key={opt.id} onClick={() => setOpt('delivery', opt.id)}
                    style={{
                      flex: 1, padding: '16px', borderRadius: 12, cursor: 'pointer',
                      border: options.delivery === opt.id ? '2px solid #007BFF' : '2px solid #e5e7eb',
                      background: options.delivery === opt.id ? 'rgba(0,123,255,0.05)' : 'white',
                      textAlign: 'center', transition: 'all 0.2s', fontFamily: 'DM Sans',
                    }}>
                    <div style={{ color: options.delivery === opt.id ? '#007BFF' : '#9ca3af', marginBottom: 6 }}>{opt.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: options.delivery === opt.id ? '#007BFF' : '#374151' }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>

              {options.delivery === 'delivery' && (
                <div>
                  <label className="form-label">Delivery Address *</label>
                  <textarea className="form-input" rows={3}
                    value={options.address}
                    onChange={e => setOpt('address', e.target.value)}
                    placeholder="House #, Street, Area, City, Postal Code"
                    style={{ resize: 'vertical' }}
                  />
                </div>
              )}

              <div style={{ marginTop: 16 }}>
                <label className="form-label">Special Instructions (Optional)</label>
                <textarea className="form-input" rows={2}
                  value={options.notes}
                  onChange={e => setOpt('notes', e.target.value)}
                  placeholder="Any specific requirements or notes..."
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
                <SummaryRow label="Files" value={`${files.length} document${files.length !== 1 ? 's' : ''}`} />
                <SummaryRow label="Color Mode" value={options.colorMode === 'color' ? 'Full Color' : 'B&W'} />
                <SummaryRow label="Paper Size" value={options.paperSize} />
                <SummaryRow label="Sides" value={options.sides === 'single' ? 'Single-Sided' : 'Double-Sided'} />
                <SummaryRow label="Binding" value={options.binding === 'none' ? 'No Binding' : options.binding} />
                <SummaryRow label="Copies" value={options.copies} />
                <SummaryRow label="Delivery" value={options.delivery === 'pickup' ? 'Self-Pickup' : 'Home Delivery'} />
              </div>

              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 14, marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Estimated Total</span>
                  <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, color: '#007BFF' }}>
                    Rs. {estimatedPrice()}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>
                  * Actual price may vary based on document page count.
                </p>
              </div>

              <button className="btn btn-primary" onClick={handleSubmit}
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                {loading ? <><span className="loader" /> Placing Order...</> : <><Printer size={17} /> Place Print Order</>}
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .container > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
      <span style={{ color: '#6b7280' }}>{label}</span>
      <span style={{ fontWeight: 600, color: '#374151', textAlign: 'right', maxWidth: '55%' }}>{value}</span>
    </div>
  );
}