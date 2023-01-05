#pragma GCC optimize ("O3")
#pragma GCC optimize ("unroll-loops")

#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
 
using namespace std;
using namespace __gnu_pbds;

template<class T>
using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;

template<typename T> 
using ordered_multiset = tree<T, null_type, less_equal<T>, rb_tree_tag, tree_order_statistics_node_update>;

template<class key, class value, class cmp = std::less<key>>
using ordered_map = tree<key, value, cmp, rb_tree_tag, tree_order_statistics_node_update>;

using ll = long long;
using ld = long double;
#define endl '\n'
#define int long long
#define all(x) (x).begin(), (x).end()

#define r_ep(i, a, b, s) for (int i = (a); (s) > 0 ? i < (b) : i > (b); i += (s))
#define r_ep1(e) r_ep(i, 0, e, 1)
#define r_ep2(i, e) r_ep(i, 0, e, 1)
#define r_ep3(i, b, e) r_ep(i, b, e, 1)
#define r_ep4(i, b, e, s) r_ep(i, b, e, s)
#define GET5(a, b, c, d, e, ...) e
#define r_epc(...) GET5(__VA_ARGS__, r_ep4, r_ep3, r_ep2, r_ep1)
#define rep(...) r_epc(__VA_ARGS__)(__VA_ARGS__)
#define each(x, a) for (auto& x: a)
 
template<class T> void read(T& x) {
    cin >> x;
}
template<class H, class... T> void read(H& h, T&... t) {
    read(h);
    read(t...);
}
template<class A> void read(A *x, int size) {
    rep(size) 
        read(x[i]);
}
template<class A> void read(vector<A>& x) {
    each(a, x)
        read(a);
}
 
template<class T> void print(T& x) {
    cout << x << ' ';
}
template<class H, class... T> void print(H h, T... t) {
    print(h);
    print(t...);
}
template<class A> void print(A *x, int size) {
    rep(size)
        print(x[i]);
    cout << '\n';
}
template<class A> void print(vector<A>& x) {
    each(a, x)
        print(a);
}
 
template<class H, class... T> void debug(H h, T... t) {
    print(h, t...);
    cout << endl;
}

signed main() {

    ios_base::sync_with_stdio(false); cin.tie(0);

    auto __solve = [&] () {
        
    };
    int tc = 1;
    cin >> tc;
    for(int i = 1; i <= tc; i++) {
        // cout << "Case #" << i << ": ";
        __solve();
    }
    return 0;
}
