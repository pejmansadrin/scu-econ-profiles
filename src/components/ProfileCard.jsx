import React from 'react';

export default function ProfileCard({ user }) {
  if (!user) {
    return <div>کاربری یافت نشد.</div>; // Fallback for safety
  }

  return (
    <div className="profile-page">
      <a href="#" className="back-link"><i className="bi bi-arrow-right"></i> بازگشت به لیدربورد</a>
      
      <div className="profile-header">
        <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>ورودی سال {user.entryYear}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span>سطح</span>
          <strong>{user.level}</strong>
        </div>
        <div className="stat-item">
          <span>امتیاز کل</span>
          <strong>{user.points} XP</strong>
        </div>
      </div>

      <div className="activities-section">
        <h3>آخرین فعالیت‌ها</h3>
        <ul className="activities-list">
          {user.activities.map((activity, index) => (
            <li key={index}>
              <div className="activity-icon">
                <i className="bi bi-check2-circle"></i>
              </div>
              <div className="activity-details">
                <p>{activity.title}</p>
                <small>{activity.date} | <strong>{activity.points} امتیاز</strong></small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}