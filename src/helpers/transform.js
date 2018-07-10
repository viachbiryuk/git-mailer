class Transform {

  constructor (tg) {
    this._tg = tg;
    this.autoFormat();
  }

  autoFormat () {
    if (this._tg.length) {
      this.loopFormat();
    }
    else {
      this.format();
    }
  }

  format (tg) {
    let returnTg = Boolean(tg);
    tg = tg || this._tg;
    let result = {};
    Object.keys(tg._doc || tg).map((propName) => {
      let trPropName = propName;
      if (propName[0] === '_') {
        trPropName = propName.replace(/^(_){1,2}/, '');
      }
      result[trPropName] = tg[propName];
    });
    if (!returnTg) {
      this._tg = result;
    }
    return returnTg ? result : this;
  }

  loopFormat () {
    let result = [];
    this._tg.map((item) => {
      let formatted = this.format(item);
      result.push(formatted);
    });
    this._tg = result;
    return this;
  }

  exclude (excludeFields, tg) {
    let returnTg = Boolean(tg);
    tg = tg || this._tg;
    let result = {};
    Object.keys(tg._doc || tg).map((propName) => {
      if (!excludeFields.includes(propName)) {
        result[propName] = tg[propName];
      }
    });
    if (!returnTg) {
      this._tg = result;
    }
    return returnTg ? result : this;
  }

  loopExclude (excludeFields) {
    let result = [];
    this._tg.map((item) => {
      let filtered = this.exclude(excludeFields, item);
      result.push(filtered);
    });
    this._tg = result;
    return this;
  }

  out () {
    return this._tg;
  }

}


module.exports = Transform;
