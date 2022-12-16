export const getColorForAverage = average => {
    if(average >= 0 && average < 2){
        return 'text-danger';
    }else if(average >= 2 && average < 3){
        return 'text-warning';
    }else if(average >= 4 && average <= 5){
        return 'text-success';
    }

    return 'text-primary';
}