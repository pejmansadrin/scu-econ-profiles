// src/components/ProfileCard.jsx

import React, { useState } from 'react';
import { Card, Row, Col, ListGroup, Badge, ProgressBar, Modal, Button } from 'react-bootstrap';
import { config } from '../config.js';
import { QRCodeCanvas } from 'qrcode.react'; // ۱. ایمپورت کتابخانه

export default function ProfileCard({ user }) {
  if (!user) {
    return <div>کاربری یافت نشد.</div>;
  }

  // --- State برای مدیریت Modal ---
  const [showQR, setShowQR] = useState(false);
  const handleCloseQR = () => setShowQR(false);
  const handleShowQR = () => setShowQR(true);

  // --- راه‌حل QR Code (کاملاً در مرورگر) ---
  // ۲. استفاده از آدرس فعلی مرورگر
  const profileUrl = window.location.href; 
  
  // --- تابع دانلود QR Code (بازنویسی شده برای <canvas>) ---
  const handleDownloadQR = () => {
    // ۳. پیدا کردن canvas توسط ID
    const canvas = document.getElementById('profile-qr-canvas');
    if (canvas) {
      // تبدیل canvas به یک لینک داده (data URL)
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream'); // ترفندی برای اطمینان از دانلود

      // ایجاد لینک دانلود
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = pngUrl;
      a.download = `qrcode-${user.id}.png`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert('خطا در پیدا کردن QR Code برای دانلود');
    }
  };
  // --- پایان تابع دانلود ---

  // --- Progress Bar Logic ---
  const { levelThresholds } = config;
  const currentLevel = user.level;
  const nextLevel = currentLevel + 1;

  const currentLevelPoints = levelThresholds[currentLevel - 1] || 0;
  const nextLevelPoints = levelThresholds[currentLevel] || (currentLevelPoints + 1000); 

  const pointsInLevel = user.points - currentLevelPoints;
  const pointsNeededForNextLevel = nextLevelPoints - currentLevelPoints;
  const progressPercent = Math.min(100, (pointsInLevel / pointsNeededForNextLevel) * 100);
  const pointsToNextLevel = nextLevelPoints - user.points;
  // --- End of Logic ---

  const reversedActivities = user.activities.slice().reverse();

  return (
    <div className="profile-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <a href="#" className="back-link d-inline-block"><i className="bi bi-arrow-right"></i> بازگشت به لیدربورد</a>
        
        <Button onClick={handleShowQR} className="qr-button">
          <i className="bi bi-qr-code me-2"></i> 
          دریافت QR Code
        </Button>
      </div>
      
      <Card className="profile-card-glass">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col md={3} className="text-center mb-3 mb-md-0">
              <img src={user.avatar} alt={user.name} className="profile-avatar" />
            </Col>
            <Col md={9}>
              <div className="profile-info text-center text-md-end">
                <h2>{user.name}</h2>
                <p className="text-muted">ورودی سال {user.entryYear}</p>
              </div>
            </Col>
          </Row>

          <div className="progress-section">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="level-indicator">سطح {currentLevel}</span>
              <span className="total-xp">{user.points} XP</span>
            </div>
            <ProgressBar 
              now={progressPercent} 
              variant="warning" 
              className="level-progress-bar"
            />
            <div className="text-center mt-2 progress-text">
              {pointsToNextLevel > 0 ? `${pointsToNextLevel} امتیاز تا سطح ${nextLevel}` : "شما به بالاترین سطح رسیده‌اید!"}
            </div>
          </div>

          <hr className="my-4" />

          <div className="activities-section">
            <h3 className="mb-3 text-center">آخرین فعالیت‌ها</h3>
            <ListGroup variant="flush">
              {reversedActivities.map((activity, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center activity-item-glass px-0 bg-transparent">
                  <div className="me-2 ms-auto text-end">
                    <div className="fw-bold">{activity.title}</div>
                    {activity.date}
                  </div>
                  <Badge bg="secondary" pill>
                    {activity.points} امتیاز
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showQR} onHide={handleCloseQR} centered dialogClassName="qr-modal">
        <Modal.Header closeButton>
          <Modal.Title as="h5">QR Code پروفایل</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* --- ۴. جایگزینی <img> با <QRCodeCanvas> --- */}
          <QRCodeCanvas 
            id="profile-qr-canvas" // ID برای تابع دانلود
            value={profileUrl}      // لینکی که باید ساخته شود
            size={200}              // اندازه بر حسب پیکسل
            bgColor={"#ffffff"}     // پس‌زمینه سفید
            fgColor={"#000000"}     // رنگ خطوط QR
            level={"L"}             // سطح خطا (Low)
            includeMargin={false}
          />
          <p className="mt-3">این کد را برای اشتراک‌گذاری پروفایل {user.name} اسکن کنید.</p>
          <p className="profile-url-display">{profileUrl}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseQR} className="qr-close-button">
            بستن
          </Button>
          <Button variant="primary" onClick={handleDownloadQR} className="qr-download-button">
            <i className="bi bi-download me-2"></i>
            دانلود
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}