// src/pages/HomePage.jsx

import React, { useState } from 'react';
import { config } from '../config';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import JSZip from 'jszip';
import { toDataURL as toQRDataURL } from 'qrcode';

export default function HomePage({ users }) {
  const [isZipping, setIsZipping] = useState(false);

  // این خط اکنون به درستی کار می‌کند چون App.jsx آرایه users را پاس می‌دهد
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  // --- تابع دانلود همه‌ی QR Code ها ---
  const handleDownloadAllQRCodes = async () => {
    setIsZipping(true);
    
    // از آدرس فعلی مرورگر استفاده می‌کنیم تا هم روی localhost و هم روی دامنه اصلی کار کند
    const currentOrigin = window.location.origin;
    const currentPath = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
    const baseUrlForQR = `${currentOrigin}${currentPath.replace(/\/+$/, '/')}`;

    const zip = new JSZip();

    for (const user of sortedUsers) {
      try {
        const profileUrl = `${baseUrlForQR}#${user.id}`;
        // تبدیل لینک به QR code (به صورت data URL)
        const qrDataUrl = await toQRDataURL(profileUrl, { width: 300, errorCorrectionLevel: 'L' });
        // استخراج دیتای base64 از data URL
        const base64Data = qrDataUrl.split(',')[1];
        
        const fileName = `${user.id} - ${user.name}.png`;
        // افزودن فایل به zip
        zip.file(fileName, base64Data, { base64: true });
      } catch (err) {
        console.error(`Failed to generate QR for ${user.name}:`, err);
      }
    }

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'SCU-Econ-All-QRCodes.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to create zip file:', err);
      alert('خطا در ساخت فایل فشرده.');
    }
    
    setIsZipping(false);
  };
  // --- پایان تابع دانلود ---

  const getLevelProgress = (points, level) => {
    if (level >= config.levelThresholds.length) return 100;
    const currentLevelPoints = config.levelThresholds[level - 1];
    const nextLevelPoints = config.levelThresholds[level];
    const pointsInLevel = points - currentLevelPoints;
    const pointsNeededForNextLevel = nextLevelPoints - currentLevelPoints;
    if (pointsNeededForNextLevel === 0) return 100;
    const progress = Math.min(100, Math.max(0, (pointsInLevel / pointsNeededForNextLevel) * 100));
    return progress;
  };

  const getRankClass = (index) => {
    if (index === 0) return 'rank-1';
    if (index === 1) return 'rank-2';
    if (index === 2) return 'rank-3';
    return '';
  };

  return (
    <div className="homepage">
      <h2 className="mb-4 text-center" style={{ color: '#fff' }}>لیدربورد اعضای فعال</h2>

      <ListGroup as="ol">
        {sortedUsers.map((user, index) => {
          const progressPercent = getLevelProgress(user.points, user.level);
          const rankClass = getRankClass(index);
          return (
            <ListGroup.Item
              key={user.id}
              href={`#${user.id}`}
              action
              className={`d-flex align-items-center user-list-item ${rankClass}`}
            >
              <div className="rank-number">{index + 1}</div>
              <div className="avatar-container" style={{ '--progress': `${progressPercent}%` }}>
                <img src={user.avatar} alt={user.name} className="avatar-image" />
                <span className="level-badge">{user.level}</span>
                <div className="avatar-xp-overlay">
                  <span>{user.points} XP</span>
                </div>
              </div>
              <div className="me-3 ms-auto user-info text-end">
                <div className="fw-bold name">{user.name}</div>
                <div className="entry-year">ورودی {user.entryYear}</div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      {/* --- دکمه دانلود به انتهای لیست منتقل شد --- */}
      <div className="d-grid gap-2 mt-4"> {/* <-- تغییر mb-4 به mt-4 */}
        <Button 
          className="download-all-qr-button" 
          onClick={handleDownloadAllQRCodes} 
          disabled={isZipping || users.length === 0}
        >
          {isZipping ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              در حال ساخت فایل فشرده...
            </>
          ) : (
            <>
              <i className="bi bi-archive-fill me-2"></i>
              دانلود همه‌ی QR Code ها (ZIP)
            </>
          )}
        </Button>
      </div>
      {/* --- پایان دکمه --- */}
    </div>
  );
}