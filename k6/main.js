import http from 'k6/http';
import { check, sleep } from 'k6'

export let options = {
    stages: [
        { duration: "10s", target: 25 },
        { duration: "10s", target: 25 },
        { duration: "10s", target: 0 },
    ],
    thresholds: {
        "http_req_duration": ["p(95)<180"]
    },
};

export default function() {
    let res = http.get("https://badgeuse-intelligente.herokuapp.com/");
    check(res, {
        "status was 200": (r) => r.status === 200
    });
    sleep(1);
}