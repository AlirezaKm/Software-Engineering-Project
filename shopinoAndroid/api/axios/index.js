import axios from 'axios'

const a1='Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZmN2M4Y2RiZDc3ZDc1MTM0Yjg0OWIzZDJhYzRhM2I1YzYyYjgxMTg1YTAwNWQ1MThkZjU2NGQ0ZGQyMjVkNDBiZDQxOTYwZjUxMGM5Y2EwIn0.eyJhdWQiOiI1IiwianRpIjoiZmY3YzhjZGJkNzdkNzUxMzRiODQ5YjNkMmFjNGEzYjVjNjJiODExODVhMDA1ZDUxOGRmNTY0ZDRkZDIyNWQ0MGJkNDE5NjBmNTEwYzljYTAiLCJpYXQiOjE0ODc5NDQ5MDgsIm5iZiI6MTQ4Nzk0NDkwOCwiZXhwIjoxNTE5NDgwOTA4LCJzdWIiOiI5MjUwMDMzIiwic2NvcGVzIjpbImFkbWluIl19.0pP0qlvaZONPnUKvW6jyUfg0G5kZsW8mnqZ1i6b-POjgT7sRKny3Wp1G-4QleHhAYwosoZ8zbDQJNjD-uT1zxN5L0HRbfT7B4tY4uBtMtUHp24Mh5HP8DULRGiL-EPdTCL9jNkdw4D6V3cqU24sjMQ1TN1xenCPyZHtg82OJFkf5cqazpLr3k04PW1YHJHFbS0EmxXec2SnX1onHcT0jPvvx1-LDKc__3geJspVwQ8BO1vbxA7L_iwlP-yjHZ8BQyBzuBGxQiEuDuCJei0C72lYK_OI_BdGEpJNx6Q1YIA-9NMS3fjUNw2wdGIKpM1xQhHoa_tx-DCtT4pLQ7jdXSjk9SxE8ttEYIeCQEKjbuHs5v81jadj-s4giGtpSD6SFfbYqSb_EHR95cdqsDEKYOgKY2z7ok_ckIWBUfrlRDTD0fVHYGi2rLEoi17tY_Qdb-lot-LDlCbOs6XFsvmWhSqG-GfRmbZMivdiCYYjVB-H2Al10YjFWCsXxAuHpUZEwxhTn1Halji7lCfoVOY6BqjGgjJqhKvoFFCzGNydnoaMH9jYv';

const a2= 'vmSN251Wre6kXf-leU5wWLh1Ar8fFoAeXw-lttPxGxYHDi2MCT3axqPc7_N4St4dgpuFSWJ_EThupe506S4_WxC283-JN3DWHnzy5gyGo2Hm-EjR2YWoEBTUvsM';

const config ={
    baseURL: 'http://shop.com/api',
    /*headers: {
        'Content-Type':'application/json'   
        /*'X-Requested-With': 'XMLHttpRequest',
        'Authorization': a1+a2
    },*/
    timeout: 2000,
};


export default axios.create(config);