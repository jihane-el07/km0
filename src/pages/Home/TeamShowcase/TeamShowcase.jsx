import React from 'react';
import styles from './TeamShowcase.module.css';

// Import Lucide icons
import { Twitter, Facebook, Mail, Linkedin } from 'lucide-react';

const TeamShowcase = () => {
  const teamMembers = [
    {
        id: 1,
        image: '/images/chef1.jpg',
        name: 'JAMES TURNER',
        title: 'Sous Chef',
        showSocial: true
    },
    {
        id: 2,
        image: '/images/chef2.jpg',
        name: 'MICHAEL RIVERA',
        title: 'Executive Chef',
        showSocial: true
    },
    {
        id: 3,
        image: '/images/chef3.jpg',
        name: 'DAVID LEBLANC',
        title: 'Pastry Chef',
        showSocial: true
    },
    {
        id: 4,
        image: '/images/chef4.webp',
        name: 'ANDREW KIM',
        title: 'Head Chef',
        showSocial: true
    }
    ];
  return (
    <>
        <div className={styles.heading}>
            <h3 className={styles.scriptHeading}>Talent and Experience</h3>
            <h2 className={styles.mainHeading}>Top Team Members</h2>
            <div className={styles.divider2}>
                <div className={styles.line}></div>
                <span className={styles.icon2}><img src="/images/flower.webp" className={styles.featureIcon1}/></span>
                <div className={styles.line}></div>
            </div>
        </div>
        <div className={styles.teamShowcase}>
        {teamMembers.map((member) => (
            <div key={member.id} className={styles.teamCard}>
            <div className={styles.imageContainer}>
                <img src={member.image || "/placeholder.svg"} alt={member.name || "Chef"} className={styles.chefImage} />
            </div>
            
            {member.showSocial && (
                <div className={styles.infoOverlay}>
                <h2 className={styles.chefName}>{member.name}</h2>
                <p className={styles.chefTitle}>{member.title}</p>
                
                <div className={styles.socialIcons}>
                    <a href="#" className={styles.socialIcon}>
                    <Twitter size={16} />
                    </a>
                    <a href="#" className={styles.socialIcon}>
                    <Facebook size={16} />
                    </a>
                    <a href="#" className={styles.socialIcon}>
                    <Mail size={16} />
                    </a>
                    <a href="#" className={styles.socialIcon}>
                    <Linkedin size={16} />
                    </a>
                </div>
                </div>
            )}
            </div>
        ))}
        </div>
    </>
    
  );
};

export default TeamShowcase;