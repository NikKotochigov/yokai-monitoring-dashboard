'use client';

import { YokaiList } from '@/widgets/yokai-list';
import styles from './monitoring-page.module.scss';

export default function Monitoring() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        Yokai Monitoring Dashboard
                    </h1>
                    <p className={styles.subtitle}>
                        Real-time spirit detection and capture system for Tokyo regions
                    </p>
                </div>
                <div className={styles.statusIndicator}>
                    <span className={styles.statusDot}></span>
                    <span>Live Monitoring</span>
                </div>
            </header>

            <main className={styles.main}>
                <YokaiList />
            </main>
        </div>
    );
}
