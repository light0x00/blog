export default {
    forRegex({ pattern, errorMsg, allowEmpty = false }) {
        return (rule, value, callback) => {
            if (allowEmpty && (value == null || value == "")) {
                callback();
            } else if (pattern.test(value)) {
                callback();
            } else {
                callback(new Error(errorMsg));
            }
        };
    },
    forEmail({ errorMsg, allowEmpty }) {
        return this.forRegex({ pattern: /.+@[a-z0-9]+\..+/, errorMsg, allowEmpty });
    },
    forURL({ errorMsg, allowEmpty }) {
        return this.forRegex({
            pattern: /^((http|https):\/\/)?[^/]+\.[^/]+/,
            errorMsg,
            allowEmpty
        });
    }
};
