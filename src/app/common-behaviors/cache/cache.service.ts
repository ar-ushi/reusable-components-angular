import { Injectable } from "@angular/core";

class Node<T>{
    constructor(public key: string, public value: T, public prev?: Node<T> | null,public next?: Node<T>,
    ) {} //Represents a Node in the Linked List
}

@Injectable({
    providedIn: 'root',
})
export class CacheService<T> {
    private cache : Map<string, Node<T>> = new Map();
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;  
    private capacity: number = 5;

    constructor() {}

    setCapacity(capacity: number): void{
        this.capacity = capacity;
    }

    save(key: string, value: T): void{
        if (this.cache.has(key)){
            const node = this.cache.get(key);
            node!.value = value;
            this.moveToHead(node!);
        }else{
            const node = new Node(key, value);
            this.cache.set(key, node);
            this.addToHead(node!);
        }
        if (this.cache.size > this.capacity){
            this.removeFromTail();
        }
    }

    get(key: string) : T | undefined{
        if (this.cache.has(key)){
            const node = this.cache.get(key);
            this.moveToHead(node!);
            return node?.value;
        }
        return;
    }

    private addToHead(node : Node<T>){
        // Two Scenarios - cache empty and cache has at least one item 
        node.next = this.head!;
        node.prev = null;
    
        if (this.head) {
          this.head.prev = node;
        }
    
        this.head = node;
    
        if (!this.tail) {
          this.tail = node;
        }
    }

    private moveToHead(node: Node<T>){
        this.removeNode(node);
        this.addToHead(node);    
    }

    private removeFromTail(){
        if (this.tail){
            this.cache.delete(this.tail.key);
            this.removeNode(this.tail);
        }
    }

    private removeNode(node : Node<T>){
        if (node.prev){ 
            node.prev.next = node.next;
        } else{
            this.head = node.next!;
        }

        if (node.next){
            node.next.prev = node.prev;
        } else{
            this.tail= node.prev!
        }
    }
}