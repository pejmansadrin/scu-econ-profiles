import React from 'react';
import { Card, Row, Col, ListGroup, Badge } from 'react-bootstrap';

export default function ProfileCard({ user }) {
  if (!user) {
    return <div>کاربری یافت نشد.</div>;
  }

  return (
    <div className="profile-page">
      <a href="#" className="back-link mb-4 d-inline-block"><i className="bi bi-arrow-right"></i> بازگشت به لیدربورد</a>
      
      <Card className="profile-card-glass">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="text-center mb-3 mb-md-0">
              <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="profile-avatar" />
            </Col>
            <Col md={9}>
              <div className="profile-info text-center text-md-end">
                <h2>{user.name}</h2>
                <p className="text-muted">ورودی سال {user.entryYear}</p>
              </div>
              <Row className="text-center mt-3 profile-stats">
                <Col>
                  <div className="stat-item">
                    <span className="text-muted">سطح</span>
                    <strong>{user.level}</strong>
                  </div>
                </Col>
                <Col>
                  <div className="stat-item">
                    <span className="text-muted">امتیاز کل</span>
                    <strong>{user.points} XP</strong>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <hr className="my-4" />

          <div className="activities-section">
            <h3 className="mb-3 text-center">آخرین فعالیت‌ها</h3>
            <ListGroup variant="flush">
              {user.activities.map((activity, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start activity-item-glass px-0 bg-transparent">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{activity.title}</div>
                    {activity.date}
                  </div>
                  <Badge bg="primary" pill>
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