// Show me sales for the last 3 months
// Show me all sales for the last 3 months
// Show me all sales above £100 in November
// Show me the top sales for the last 3 months

// Grammar ->
// "Show me" ["quantity to show"] ["thing to show"] ["filter"] ["date range"]

// Quantity to show -> all, top, top [x], best, highest [x], lowest [x], newest [x], oldest [x]
// Thing to show -> sales, order, etc.
// Filter -> above [x], below [x]
// Date range -> for the last [x] [y], in [x]

// "Sort that" by date

// "Just show" ["thing to show"] ["filter"] ["date range"] -> Just show sales over �200

// "Change that to" ["filter"] ["date range"]

// "Break that down into"

// How many sales have we had in the last year


ar segments = {};
segments.start = [];
segments.start.push({ text: "show me", type: "select" });
segments.start.push({ text: "just show", type: "limit" });

var sentences = {};
segments.time = [];
segments.time.push({ text: "for the last (x) (y)", type: "date-range" });

var selectionEntities = [];

selectionEntities.push({ name: "sales", synonyms: [ "orders" ], mapsTo: "sales" });
selectionEntities.push({ name: "customers", mapsTo: "customers" });

var text = "show me sales";

var analysis = "show me";

function parser(ctx) {
    var text = ctx.currentText;

    ctx.request = ctx.request || {};
    console.log(text);

    if (text.substr(0,7) == "show me") {
        ctx.request.type = "select";
    }

    if (text.indexOf("sales") > -1) {
        ctx.request.entity = "sales";
    }

    if (text.indexOf("customers") > -1) {
        ctx.request.entity = "customers";
    }


    if (text.indexOf("last 3 months") > -1) {
        ctx.request.range = "-3months";
    }
}

function replaceVariables(text, properties) {
	var o = text.replace(/%(\w+)%/g, function (_,key) {
		return properties[key]
	});
		
	return o;
}

function buildSQL(ctx) {
    var sql = "";

    if (ctx.request.type == "select") {
        sql = sql + "SELECT * FROM %entity%";
    };

    sql = replaceVariables(sql, ctx.request);

    if (ctx.request.range == "-3months") {
        sql = sql + " WHERE %date% >= %today% - 90"
    }

    return sql;

}

ctx = {
    currentText : "show me customers for the last 3 months"
}

parser(ctx);

console.log(JSON.stringify(ctx));

var sql = buildSQL(ctx);

console.log(sql);