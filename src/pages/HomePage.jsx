import React from 'react';
import { config } from '../config';
import ListGroup from 'react-bootstrap/ListGroup'; // کامپوننت ListGroup را وارد می‌کنیم

export default function HomePage({ users }) {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

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
      <h2 className="mb-4">لیدربورد اعضای فعال</h2>
      {/* استفاده از ListGroup به جای ol */}
      <ListGroup as="ol" numbered>
        {sortedUsers.map((user, index) => {
          const progressPercent = getLevelProgress(user.points, user.level);
          const rankClass = getRankClass(index);
          return (
            <ListGroup.Item
              as="li"
              key={user.id}
              href={`#${user.id}`}
              action // این باعث می‌شود آیتم‌ها حالت هاور بگیرند
              className={`d-flex align-items-center user-list-item ${rankClass}`}
            >
              <div className="avatar-container" style={{ '--progress': `${progressPercent}%` }}>
                <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="avatar-image" />
                <span className="level-badge">{user.level}</span>
                <div className="avatar-xp-overlay">
                  <span>{user.points} XP</span>
                </div>
              </div>
              <div className="ms-3 me-auto user-info">
                <div className="fw-bold name">{user.name}</div>
                <div className="entry-year">ورودی {user.entryYear}</div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}