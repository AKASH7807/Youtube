// export const OLD_KEY= 'AIzaSyAolCi3PTViW6gy9gimSUBT91pcjzaugbQ';

export const API_KEY = 'AIzaSyBubDPf_muGjS6O-24-ISMAjnEH-mKxBZg';



export const value_conventer = (value) => {
    if(value >= 1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value >= 1000){
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}