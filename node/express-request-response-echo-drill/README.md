# Express request response echo drill

[GitHub](https://github.com/Thinkful-Ed/express-request-response-echo-drill) | [Glitch](https://glitch.com/edit/#!/incandescent-hour)

For this drill, you need to implement a GET endpoint at `/echo/:what`, where `:what` is [named route parameter](https://expressjs.com/en/guide/routing.html#route-parameters).

The endpoint should return an object with keys for `hostname`, `query`, and `params`. `hostname` should be the host for the app. `query` should be an object representing URL query parameters sent in the request (if any), and `params` should be an object representing any named route parameters (in this case, it will only have an entry for "what"). So, for instance, a request to `https://your-glitch-subdomain.glitch.me/echo/pets?cat=meow&dog=woof` should receive a JSON response that looks like this:

```json
{
    "hostname": "your-glitch-subdomain.glitch.me",
    "query": {
        "cat": "meow",
        "dog": "woof"
    },
    "params": {
      "what": "pets"
    }
}
```

Note that the values for all of these can be found on the request object, as documented [here](http://expressjs.com/uk/api.html#req).
