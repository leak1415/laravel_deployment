import './bootstrap';
import { createApp } from 'vue';
import HomeDashboard from './components/HomeDashboard';

const mountHomeDashboard = () => {
    const mountPoint = document.getElementById('home-app');

    if (!mountPoint) {
        return;
    }

    const parseDataset = (key, fallback = []) => {
        const rawValue = mountPoint.dataset[key];

        if (!rawValue) {
            return fallback;
        }

        try {
            return JSON.parse(rawValue);
        } catch (error) {
            return fallback;
        }
    };

    createApp(HomeDashboard, {
        links: parseDataset('links'),
        metrics: parseDataset('metrics'),
        highlights: parseDataset('highlights'),
    }).mount(mountPoint);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHomeDashboard);
} else {
    mountHomeDashboard();
}
