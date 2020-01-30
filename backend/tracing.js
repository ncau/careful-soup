const { initTracer: initJaegerTracer } = require("jaeger-client");
const opentracing = require('opentracing');
//hack
const {Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

const initTracer = (serviceName) => {
  const config = {
    serviceName: serviceName,
    sampler: {
      type: "probabilistic",
      param: 1,
      format: "proto",
    },
    reporter: {
      logSpans: true,
    },
  };
  const options = {
    logger: {
      info(msg) {
        console.log("INFO ", msg);
      },
      error(msg) {
        console.log("ERROR", msg);
      },
    },
  };
  return initJaegerTracer(config, options);
};

module.exports.createTracer = function createTracer(serviceName){
  opentracing.initGlobalTracer(initTracer(serviceName));
  this.tracer = opentracing.globalTracer();
//   console.log(`does this exist ${this.tracer}`)
  opentracing.globalTracer.activeSpan = this.tracer;
  global.tracingFlag = true;
}