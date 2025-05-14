import { shuffleArray } from './index';

test('utils -> shuffleArray', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(array);
    
    // Check if the shuffled array has the same length
    expect(shuffledArray.length).toBe(array.length);
    
    // Check if the shuffled array contains the same elements
    expect(shuffledArray.sort()).toEqual(array.sort());
});