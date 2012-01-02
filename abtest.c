#import <stdio.h>
#import <stdlib.h>
#import <assert.h>
#import <math.h>

int ascending(const void *a, const void *b) 
{ 
    const int *ia = (const int *)a;
    const int *ib = (const int *)b;
    return *ia  - *ib; 
} 

float betavariate(int alfa, int beta) {
	int *numbers;
	float p;
	int k;
	int n = alfa + beta - 1;

	numbers = calloc(n, sizeof(int));
	for (k = 0; k < n; k++) 
		numbers[k] = rand();
	
	qsort(numbers, n, sizeof(int), ascending);
		
	p = ((float) numbers[alfa - 1]) / RAND_MAX;
	free(numbers);
	return p;
}

int sample(int s1, int f1, int s2, int f2) {
	float r1, r2;

	r1 = betavariate(s1 + 1, f1 + 1);
	r2 = betavariate(s2 + 1, f2 + 1);

	return r1 > r2;
}

float simulate(int n_iter, int s1, int f1, int s2, int f2) {
	int k;
	int count = 0;

	for (k = 0; k < n_iter; k++)
		count += sample(s1, f1, s2, f2);

	return ((float) count) / n_iter;
}

void print_odds(float p) {
	double o = p / (1 - p);
	
	if (o > 1)
		printf("%.4f to 1", o);
	else
		printf("1 to %.4f", 1/o);
	
	printf(" or %.4f dB\n", 10 * log10(o));
}

int main(int argc, char** argv) {
	float p;
	srand(time(NULL));

	int k;
	/*for (k = 0; k < 10000; k++) 
		printf("%f\n", betavariate(3, 2));*/

	p = simulate(10000, 30, 20, 25, 20);
	printf("p %.4f\n", p);	
	print_odds(p);
	
}