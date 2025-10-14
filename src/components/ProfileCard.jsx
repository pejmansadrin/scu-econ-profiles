import React from 'react';
import { Card, Row, Col, ListGroup, Badge, ProgressBar } from 'react-bootstrap';
import { config } from '../config.js';

export default function ProfileCard({ user }) {
  if (!user) {
    return <div>کاربری یافت نشد.</div>;
  }

  // --- Progress Bar Logic ---
  const { levelThresholds } = config;
  const currentLevel = user.level;
  const nextLevel = currentLevel + 1;

  const currentLevelPoints = levelThresholds[currentLevel - 1] || 0;
  const nextLevelPoints = levelThresholds[currentLevel] || (currentLevelPoints + 1000); // Fallback for max level

  const pointsInLevel = user.points - currentLevelPoints;
  const pointsNeededForNextLevel = nextLevelPoints - currentLevelPoints;
  const progressPercent = Math.min(100, (pointsInLevel / pointsNeededForNextLevel) * 100);
  const pointsToNextLevel = nextLevelPoints - user.points;
  // --- End of Logic ---

  const reversedActivities = user.activities.slice().reverse();

  return (
    <div className="profile-page">
      <a href="#" className="back-link mb-4 d-inline-block"><i className="bi bi-arrow-right"></i> بازگشت به لیدربورد</a>
      
      <Card className="profile-card-glass">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col md={3} className="text-center mb-3 mb-md-0">
              <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="profile-avatar" />
            </Col>
            <Col md={9}>
              <div className="profile-info text-center text-md-end">
                <h2>{user.name}</h2>
                <p className="text-muted">ورودی سال {user.entryYear}</p>
              </div>
            </Col>
          </Row>

          {/* New Progress Section */}
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
    </div>
  );
}