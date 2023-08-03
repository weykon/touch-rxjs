import * as rxjs from 'rxjs';

// a simple promise delay some seconds 
function delay(seconds: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(seconds);
        }, seconds * 1000);
    });
}

async function main() {
    // create an observable from a promise
    const observable = rxjs.from(delay(3));
    // subscribe to the observable;
    observable.pipe()
    observable.subscribe((seconds) => {
        console.log(`delay ${seconds} seconds`);
    });

    event_example()
    pipe_example()
}

function event_example() {
    const et = new EventTarget()
    rxjs.fromEvent(et, 'click').subscribe(() => console.log('Clicked!'));
    const clickFire = async () => {
        await delay(2);
        const e = new Event('click')
        et.dispatchEvent(e);
    }
    clickFire();
}

function pipe_example() {
    const et = new EventTarget()
    rxjs.fromEvent(et, 'click')
        .pipe(rxjs.scan((count) => count + 1, 0))
        .subscribe((count) => console.log('Clicked!: ',count));
    const clickFire = async (second: number) => {
        await delay(second);
        const e = new Event('click')
        et.dispatchEvent(e);
    }
    clickFire(1)
    clickFire(2)
    clickFire(3)

}

main()