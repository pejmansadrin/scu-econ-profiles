import React from 'react';
import { config } from '../config';

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
      <h2>لیدربورد اعضای فعال</h2>
      <ol className="user-list">
        {sortedUsers.map((user, index) => {
          const progressPercent = getLevelProgress(user.points, user.level);
          const rankClass = getRankClass(index);
          return (
            <li key={user.id} className={rankClass}>
              <a href={`#${user.id}`}>
                <span className="rank">{index + 1}</span>
                <div className="avatar-container" style={{ '--progress': `${progressPercent}%` }}>
                  <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="avatar-image" />
                  <span className="level-badge">{user.level}</span>
                  {/* این بخش جدید برای نمایش XP روی هاور است */}
                  <div className="avatar-xp-overlay">
                    <span>{user.points} XP</span>
                  </div>
                </div>
                <div className="user-info">
                  <span className="name">{user.name}</span>
                  <span className="entry-year">ورودی {user.entryYear}</span>
                </div>
                {/* <span> امتیاز از اینجا حذف شد */}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}