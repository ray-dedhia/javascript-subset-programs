var MAX_ITERS = 50;

function random_between(min, max) {
    /****************************************************
    * Return random integer between min and max
    ****************************************************/
    return Math.floor(
        Math.random() * (max - min) + min
    );
}

function calc_mean_centroid(dataset, start, end) {
    /****************************************************
    * Return mean centroid of dataset between start and end
    ****************************************************/
    var features;
    features = dataset[0].length;
    var n;
    n = end - start;
    var mean;
    mean = [];
    var i;
    i = 0;
    while (i < features) {
        mean.push(0);
        i = i + 1;
    }
    i = start;
    while (i < end) {
        var j;
        j = 0;
        while (j < features) {
            mean[j] = mean[j] + dataset[i][j] / n;
            j = j + 1;
        }
        i = i + 1;
    }
    return mean;
}

function get_random_centroids_naive_sharding(dataset, k) {
    /****************************************************
    * Get random centroids from dataset using a variation of the naive
    * sharding centroid initialization method (i.e. dividing into
    * k shards and calculating the mean)
    ****************************************************/
    var num_samples;
    num_samples = dataset.length;
    // Divide dataset into k shards:
    var step;
    step = Math.floor(num_samples / k);
    var centroids;
    centroids = [];
    var i;
    i = 0;
    while (i < k) {
        var start;
        start = step * i;
        var end;
        end = step * (i + 1);
        if (i + 1 === k) {
            end = num_samples;
        }
        centroids.push(calc_mean_centroid(dataset, start, end));
        i = i + 1;
    }
    return centroids;
}

function get_random_centroids(dataset, k) {
    /****************************************************
    * Selects random points as centroids from the dataset
    ****************************************************/
    var num_samples;
    num_samples = dataset.length;
    var centroids_index;
    centroids_index = [];
    var index;
    while (centroids_index.length < k) {
        index = random_between(0, num_samples);
        if (centroids_index.indexOf(index) === -1) {
            centroids_index.push(index);
        }
    }
    var centroids;
    centroids = [];
    var i;
    i = 0;
    while (i < centroids_index.length) {
        var centroid;
        centroid = [...dataset[centroids_index[i]]];
        centroids.push(centroid);
        i = i + 1;
    }
    return centroids;
}

function compare_centroids(a, b) {
    /****************************************************
    * Compare two centroids
    ****************************************************/
    var i;
    i = 0;
    while (i < a.length) {
        if (a[i] !== b[i]) {
            return false;
        }
        i = i + 1;
    }
    return true;
}

function should_stop(old_centroids, centroids, iters) {
    /****************************************************
    * Return true if algorithm has converged or max iters
    * have been reached; else return false
    ****************************************************/
    if (iters > MAX_ITERS) {
        return true;
    }
    if (!old_centroids || !old_centroids.length) {
        return false;
    }
    var same_count;
    same_count = true;
    var i;
    i = 0;
    while (i < centroids.length) {
        if (!compare_centroids(centroids[i], old_centroids[i])) {
            same_count = false;
        }
        i = i + 1;
    }
    return same_count;
}

function get_distance_sq(a, b) {
    /****************************************************
    * Calculate squared Euclidean distance
    * have been reached; else return false
    ****************************************************/
    var diffs;
    diffs = [];
    var i;
    i = 0;
    while (i < a.length) {
        diffs.push(a[i] - b[i]);
        i = i + 1;
    }
    return diffs.reduce((r, e) => (r + (e * e)), 0);
}

function getLabels(dataset, centroids) {
    /****************************************************
    * Return a label for each piece of data in the dataset
    ****************************************************/
    // prep data structure:
    var labels;
    labels = {};
    var c;
    c = 0;
    while (c < centroids.length) {
        labels[c] = {
            points: [],
            centroid: centroids[c],
        };
        c = c + 1;
    }
    // for each element in the dataset, choose the closest centroid
    // make that centroid the element's label
    var i;
    i = 0;
    while (i < dataset.length) {
        var a;
        a = dataset[i];
        var closest_centroid; 
        var closest_centroid_index; 
        var prevDistance;
        var j;
        j = 0;
        while (j < centroids.length) {
            var centroid;
            centroid = centroids[j];
            if (j === 0) {
                closest_centroid = centroid;
                closest_centroid_index = j;
                prevDistance = get_distance_sq(a, closest_centroid);
            } else {
                // get distance
                var distance;
                distance = get_distance_sq(a, centroid);
                if (distance < prevDistance) {
                    prevDistance = distance;
                    closest_centroid = centroid;
                    closest_centroid_index = j;
                }
            }
            j = j + 1;
        }
        // add point to centroid labels:
        labels[closest_centroid_index].points.push(a);
        i = i + 1;
    }
    return labels;
}

function get_points_mean(point_list) {
    /****************************************************
    * Get mean of points
    ****************************************************/
    var total_points;
    total_points = point_list.length;
    var means;
    means = [];
    var j;
    j = 0;
    while (j < point_list[0].length) {
        means.push(0);
        j = j + 1;
    }
    var i;
    i = 0;
    while (i < point_list.length) {
        var point;
        point = point_list[i];
        j = 0;
        while (j < point.length) {
            var val;
            val = point[j];
            means[j] = means[j] + val / total_points;
            j = j + 1;
        }
        i = i + 1;
    }
    return means;
}

function recalculate_centroids(dataset, labels, k) {
    /****************************************************
    * Each centroid is the geometric mean of the points that
    * have that centroid's label. If a centroid is empty (no points have
    * that centroid's label) you should randomly re-initialize it
    ****************************************************/
    var new_centroid;
    var new_centroid_list;
    new_centroid_list = [];
    var k;
    k = 0;
    while (k < Object.keys(labels).length) {
        var centroid_group;
        centroid_group = labels[k];
        if (centroid_group.points.length > 0) {
            // find mean
            new_centroid = get_points_mean(centroid_group.points);
        } else {
            // get new random centroid
            new_centroid = get_random_centroids(dataset, 1)[0];
        }
        new_centroid_list.push(new_centroid);
        k = k + 1;
    }
    return new_centroid_list;
}

function kmeans(dataset, k, use_naive_sharding = true) {
    /****************************************************
    * K-means clustering algorithm
    ****************************************************/
    if (dataset.length && dataset[0].length && dataset.length > k) {
        // initialize book keeping variables
        var iters;
        var old_centroids;
        var labels;
        var centroids;
        iters = 0;

        // initialize centroids randomly
        if (use_naive_sharding) {
            centroids = get_random_centroids_naive_sharding(dataset, k);
        } else {
            centroids = get_random_centroids(dataset, k);
        }

        // run the main k-means algorithm
        while (!should_stop(old_centroids, centroids, iters)) {
            // save old centroids for convergence test.
            old_centroids = [...centroids];
            iters = iters + 1;

            // assign labels to each datapoint based on centroids
            labels = getLabels(dataset, centroids);
            centroids = recalculate_centroids(dataset, labels, k);
        }

        var clusters;
        clusters = [];
        var i;
        i = 0;
        while (i < k) {
            clusters.push(labels[i]);
            i = i + 1;
        }
        var results;
        results = {
            clusters: clusters,
            centroids: centroids,
            iters: iters,
            converged: iters <= MAX_ITERS,
        };
        return results;
    } else {
        return "Invalid database";
    }
}

function test() {
    var data;
    data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5], [-1, -1, -1.5]];
    console.log("Data = " + JSON.stringify(data));

    var k;
    k = 2;
    console.log("K = " + k);

    var result
    result = kmeans(data, 2);
    console.log("Results = " + JSON.stringify(result));
}

test();

/****************************************************
* Sources:
* - https://medium.com/geekculture/implementing-k-means-clustering-from-scratch-in-javascript-13d71fbcb31e
- https://www.kdnuggets.com/2017/03/naive-sharding-centroid-initialization-method.html
****************************************************/
