import http from 'k6/http';

export let options = {
    stages: [
        { duration: "10s", target: 25 },
        { duration: "10s", target: 25 },
        { duration: "10s", target: 0 },
    ],
    thresholds: {
        "http_req_duration": ["p(95)<180"]
    },
    ext: {

    }
};