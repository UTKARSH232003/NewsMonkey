#include<bits/stdc++.h>
using namespace std;

void solve(vector<int> adj[], int distance[], int nodes){
    queue<pair<int ,int>> qu;
    qu.push({0, 0});
    int visited[nodes] = {0};
    visited[0] = 1;
    distance[0] = 0;
    while(!qu.empty()){
        int currdis = qu.front().second;
        int node = qu.front().first;
        qu.pop();
        for(auto it: adj[node]){
            if(visited[it] != 1){
                visited[it] = 1;
                qu.push({it, currdis+1});
                distance[it] = min(distance[it], currdis+1);
            }
        }
    }
}

int main(){
    vector<int> adj[] = {
        {1,3},
        {2,3,0},
        {1,6},
        {0,1,4},
        {3,5},
        {4,6},
        {5,2,7,8},
        {6,8},
        {6,7}
    };
    int distance[9];
    for(int i = 0; i < 9; i++){
        distance[i] = INT_MAX;
    }
    solve(adj, distance, 9);
    for(int i = 0; i< 9; i++){
        cout<<distance[i]<<" ";
    }

    return 0;
}