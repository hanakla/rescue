# @hanakla/rescue
Type safe one line try-catch handler

## Example

```ts
import rescue from '@hanakla/rescue'

const result = rescue(() => /* success or raise error process */)
if (result.error) { console.warn(result.error) }
if (result.result) { console.log(result.result) }

// Spread style
const [result, error] = rescue(() => /* ... */)

// Support async function
const [result, error] = await rescue(async () => /* async process */)

// Error type expection
class YourError extends Error {}

// when raises `YourError`, rescue handle and return result/
// Otherwise, rescue is not handle error it's rethrowing.
const result = rescue(() => /* process */, { expect: [YourError] })
```
